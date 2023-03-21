const jwt = require("jsonwebtoken");
const { HTTPError } = require('../error/httpError')

const config = process.env;

const verifyToken = (req, res, next) => {
  const token =
    req.body.token || req.query.token || req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }
  try {
    const decoded = jwt.verify(token, config.TOKEN_KEY);
    req.user = decoded;
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
  return next();
};

const verifyMainToken = (req, res, next) => {
  const token = req.headers["x-main-token"];

  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }
  if (token !== process.env.MAIN_TOKEN_KEY) {
    return res.status(404).send("Invalid Token");
  }

  return next();
};

module.exports = {
  verifyToken,
  verifyMainToken
};
