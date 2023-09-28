const that = {};

that.JWT = {
  CERTS: {
    BASE_PATH: "../../certs",
    PUBLIC_FILE_NAME: "public.key",
    ENCRYPTION_ALGORITHM: "RS256",
  },
};

that.BASE_SECURITY_URL = "/api";

module.exports = that;
