const db = require("../models");
const config = require("../config/auth.config");
const User = db.user;
const Role = db.role;
const Op = db.Sequelize.Op;
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
var LocalStorage = require("node-localstorage").LocalStorage,
  localStorage = new LocalStorage("./scratch");

exports.Dangnhap = (req, res) => {
  res.render("dangnhap.ejs");
};
exports.signin = async (req, res) => {
  try {
    const { email, password, id } = req.body;

    const existedUser = await User.findOne({
      where: {
        id: id,
      },
    });
    if (!existedUser) {
      return res.json({
        message: "Không tìm thấy tài khoản này,  xin vui lòng nhập lại !",
      });
    }

    if (existedUser.password != password) {
      return res.json({
        message: "Mật khẩu không đúng, xin vui lòng nhập lại !",
      });
    }

    let user = {
      id: existedUser.id,
      role: existedUser.role,
      email: existedUser.email,
    };

    var token = jwt.sign(
      { id: existedUser.id, role: existedUser.role, email: existedUser.email },
      config.secret,
      {
        expiresIn: 86400, // 24 hours
      }
    );
    localStorage.setItem("token", token);

    switch (user.role) {
      case "admin":
        res.status(200).json({
          uri: "http://localhost:8008/quanly",
        });
        break;
      case "sinhvien":
        res.status(200).json({
          uri: "http://localhost:8008/sinhvien",
        });
        break;
      case "giangvien":
        res.status(200).json({
          uri: "http://localhost:8008/giangvien",
        });
        break;

      default:
        return res.status(404).json({
          success: false,
          message: `Thông tin đăng nhập không đúng`,
        });
    }
  } catch (err) {
    // logger.error(`[login] ${err.message}`);
    return res.send(err.message);
  }
};
