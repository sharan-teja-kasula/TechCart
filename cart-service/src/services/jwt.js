const fs = require("fs");
const path = require("path");
const jwt = require("jsonwebtoken");

const constants = require("../constants");

const CERTS = constants?.JWT?.CERTS;

// relative path of the certs folder
const certsDirectory = path.resolve(__dirname, CERTS.BASE_PATH);

// path for the public key
const publicKeyPath = path.join(certsDirectory, CERTS.PUBLIC_FILE_NAME);

// public key files
const publicKey = fs.readFileSync(publicKeyPath);

const that = {};

that.decryptToken = (token) => {
  try {
    const decoded = jwt.verify(token, publicKey, {
      algorithms: [CERTS.ENCRYPTION_ALGORITHM],
    });
    return decoded;
  } catch (err) {
    throw err;
  }
};

module.exports = that;
