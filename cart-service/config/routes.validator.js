const tokenDecrypt = require("../src/services/jwt");

const requestValidator = async (req, res, next) => {
  try {
    const isSecuredAPI = req.url.includes("/api");
    if (!isSecuredAPI) {
      next();
      return;
    }

    if (req.headers["authorization"]) {
      let token = req.headers["authorization"];
      req.token = token;

      if (!token) return res.status(401).send({ msg: "Unauthorized Access!" });

      const decodedInfo = tokenDecrypt.decryptToken(token);
      req.user = decodedInfo;
      next();
    } else {
      res.status(401).send({ msg: "Unauthorized Access!" });
    }
  } catch (e) {
    res.status(401).send({ msg: "Unauthorized Access!" });
  }
};

module.exports = requestValidator;
