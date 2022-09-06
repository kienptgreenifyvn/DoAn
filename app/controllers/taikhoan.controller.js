const db = require("../models");
const User = db.user;
var pool_db = require("../config/crdb.config").pool_db;
const config = require("../config/auth.config");
var bcrypt = require("bcryptjs");

exports.danhsach_taikhoan = (req, res) => {
  User.findAll().then((ds_taikhoan) => {
    // res.json(ds_khoa);
    res.render("./taikhoan.ejs", { DS_taikhoan: ds_taikhoan });
  });
};

// exports.chitiet_khoa = (req, res) => {
//   Khoa.findOne({
//     where: {
//       id: req.params.id,
//     },
//   })
//     .then((ct_khoa) => {
//       res.json(ct_khoa);
//     })
//     .catch((err) => {
//       res.status(500).send({ message: err.message });
//     });
// };

exports.them_taikhoan = (req, res) => {
  User.create({
    id: req.body.id,
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
  }).then(() => {
    res.redirect("../taikhoan");
  });
};

exports.capnhat_taikhoan = async (req, res) => {
  await User.update(
    {
      id: req.body.id,
      email: req.body.email,
      password: req.body.password,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  )
    .then(() => {
      res.redirect("../../../quanly/taikhoan");
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

exports.xoa_taikhoan = async (req, res) => {
  await User.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then(() => {
      res.redirect("../../../quanly/taikhoan");
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};
