const fs = require("fs");
const path = require("path");
const jwt = require("jsonwebtoken");

const constants = require("../constants");

const CERTS = constants?.JWT?.CERTS;

// relative path of the certs folder
const certsDirectory = path.resolve(__dirname, CERTS.BASE_PATH);

// path for the private and public keys
const privateKeyPath = path.join(certsDirectory, CERTS.PRIVATE_FILE_NAME);
const publicKeyPath = path.join(certsDirectory, CERTS.PUBLIC_FILE_NAME);

// private and public key files
const privateKey = fs.readFileSync(privateKeyPath);
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

that.generateToken = (userInfo) => {
  try {
    const token = jwt.sign(userInfo, privateKey, {
      algorithm: CERTS.ENCRYPTION_ALGORITHM,
      expiresIn: "7 days",
    });

    return token;
  } catch (err) {
    throw err;
  }
};

module.exports = that;
