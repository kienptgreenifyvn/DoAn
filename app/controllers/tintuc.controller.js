const db = require("../models");
const Tintuc = db.tintuc;
const Op = db.Sequelize.Op;
var pool_db = require("../config/crdb.config").pool_db;
const config = require("../config/auth.config");

exports.danhsach_tintuc = (req, res) => {
  Tintuc.findAll().then((ds_tintuc) => {
    // res.json(ds_khoa);
    res.render("./tintuc.ejs", { DS_tintuc: ds_tintuc });
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

exports.them_tintuc = (req, res) => {
  Tintuc.create({
    IDtintuc: req.body.IDtintuc,
    chude: req.body.chude,
    noidung: req.body.noidung,
    ngaydang: req.body.ngaydang,
    anhtintuc: req.file.originalname,
  }).then(() => {
    res.redirect("../tintuc");
  });
};

exports.capnhat_tintuc = async (req, res) => {
  await Tintuc.update(
    {
      IDtintuc: req.body.IDtintuc,
      chude: req.body.chude,
      noidung: req.body.noidung,
      ngaydang: req.body.ngaydang,
    },
    {
      where: {
        IDtintuc: req.params.IDtintuc,
      },
    }
  )
    .then(() => {
      res.redirect("../../../quanly/tintuc");
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

exports.xoa_tintuc = async (req, res) => {
  await Tintuc.destroy({
    where: {
      IDtintuc: req.params.IDtintuc,
    },
  })
    .then(() => {
      res.redirect("../../../quanly/tintuc");
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};
