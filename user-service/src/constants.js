const that = {};

that.BYCRYPT = { SALT_ROUNDS: 10 };

that.JWT = {
  CERTS: {
    BASE_PATH: "../../certs",
    PRIVATE_FILE_NAME: "private.key",
    PUBLIC_FILE_NAME: "public.key",
    ENCRYPTION_ALGORITHM: "RS256",
  },
};

module.exports = that;
