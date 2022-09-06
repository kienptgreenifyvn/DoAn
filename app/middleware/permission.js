const authJwt = require("./authJwt");
const db = require("../models");
const Sinhvien = db.sinhvien;
const Giangvien = db.giangvien;
var LocalStorage = require("node-localstorage").LocalStorage,
  localStorage = new LocalStorage("./scratch");

requireLogin = async (req, res, next) => {
  try {
    var token = localStorage.getItem("token");
    const user = authJwt.verifyToken(token);

    req.session.user = user;
    switch (user.role) {
      case "admin":
        req.session.user = user;
        break;
      case "sinhvien":
        const sinhvien = await Sinhvien.findOne({ where: { id: user.id } });
        req.session.sinhvien = sinhvien.dataValues;
        break;
      case "giangvien":
        const giangvien = await Giangvien.findOne({ where: { id: user.id } });
        req.session.giangvien = giangvien.dataValues;
        break;

      default:
        break;
    }
    next();
  } catch (error) {
    return res
      .status(404)
      .json({ success: false, message: `Error: ${error.message}` });
  }
};
const permission = {
  requireLogin: requireLogin,
};
module.exports = permission;
