const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const db = require("../models");

verifyToken = (token) => {
  const payload = jwt.verify(token, config.secret);
  return payload;
};

const authJwt = {
  verifyToken: verifyToken,
};
module.exports = authJwt;
