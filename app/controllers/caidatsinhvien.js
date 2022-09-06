const db = require("../models");
var pool_db = require("../config/crdb.config").pool_db;
const config = require("../config/auth.config");
const { sinhvien } = require("../models");
const User = db.user;
const Sinhvien = db.sinhvien;

exports.caidatsinhvien = (req, res) => {
  const sinhvien = req.session.sinhvien;
  res.render("./caidatsinhvien.ejs", { sinhvien: sinhvien });
};

exports.capnhatmatkhau = async (req, res) => {
  try {
    const sinhvien = req.session.sinhvien;
    const { password, passwordOld, passwordNew } = req.body;

    const tonTaiMk = await User.findOne({
      where: {
        id: sinhvien.id,
      },
    });

    if (tonTaiMk.password != passwordOld) {
      return res.status(400).json({
        message: "Mật khẩu cũ không đúng, vui lòng nhập lại!",
      });
    }
    if (passwordNew != password) {
      return res.status(400).json({
        message: "Xác nhận mật khẩu không đúng, vui lòng nhập lại!",
      });
    }

    const newUser = {
      password: password,
    };

    await User.update(newUser, {
      where: {
        id: sinhvien.id,
      },
    });
    return res.status(400).json({
      message: "Đổi mật khẩu thành công!",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Đổi mật khẩu không chưa thực hiên đươc !",
    });
  }
};

exports.caidatgiangvien = (req, res) => {
  const giangvien = req.session.giangvien;
  res.render("./caidatgiangvien.ejs", { giangvien: giangvien });
};

exports.capnhatmatkhau_gv = async (req, res) => {
  try {
    const giangvien = req.session.giangvien;
    const { password, passwordOld, passwordNew } = req.body;

    const tonTaiMk = await User.findOne({
      where: {
        id: giangvien.id,
      },
    });

    if (tonTaiMk.password != passwordOld) {
      return res.status(400).json({
        message: "Mật khẩu cũ không đúng, vui lòng nhập lại!",
      });
    }
    if (passwordNew != password) {
      return res.status(400).json({
        message: "Xác nhận mật khẩu không đúng, vui lòng nhập lại!",
      });
    }
    const newUser = {
      password: password,
    };

    await User.update(newUser, {
      where: {
        id: giangvien.id,
      },
    });
    return res.status(400).json({
      message: "Đổi mật khẩu thành công!",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Đổi mật khẩu không chưa thực hiên đươc !",
    });
  }
};
