const db = require("../models");
const hoidong = db.hoidong;
const Op = db.Sequelize.Op;
var pool_db = require("../config/crdb.config").pool_db;
const config = require("../config/auth.config");

exports.danhsach_hoidong = (req, res) => {
  hoidong.findAll().then((ds_hoidong) => {
    // res.json(ds_khoa);
    res.render("./hoidong.ejs", { DS_hoidong: ds_hoidong });
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

exports.them_hoidong = (req, res) => {
  hoidong
    .create({
      IDhoidong: req.body.IDhoidong,
      chutichhoidong: req.body.chutichhoidong,
      sothanhvien: req.body.sothanhvien,
      nhanxet: req.body.nhanxet,
      diemhoidong: req.body.diemhoidong,
    })
    .then(() => {
      res.redirect("../hoidong");
    });
};

exports.capnhat_hoidong = async (req, res) => {
  await hoidong
    .update(
      {
        IDhoidong: req.body.IDhoidong,
        chutichhoidong: req.body.chutichhoidong,
        sothanhvien: req.body.sothanhvien,
        nhanxet: req.body.nhanxet,
        diemhoidong: req.body.diemhoidong,
      },
      {
        where: {
          IDhoidong: req.params.IDhoidong,
        },
      }
    )
    .then(() => {
      res.redirect("../../../quanly/hoidong");
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

exports.xoa_hoidong = async (req, res) => {
  await hoidong
    .destroy({
      where: {
        IDhoidong: req.params.IDhoidong,
      },
    })
    .then(() => {
      res.redirect("../../../quanly/hoidong");
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};
