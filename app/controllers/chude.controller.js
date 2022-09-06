const db = require("../models");
const Chude = db.chude;
const Op = db.Sequelize.Op;
var pool_db = require("../config/crdb.config").pool_db;
const config = require("../config/auth.config");

exports.danhsach_chude = (req, res) => {
  Chude.findAll().then((ds_chude) => {
    // res.json(ds_khoa);
    res.render("./chude.ejs", { DS_chude: ds_chude });
  });
};

exports.them_chude = (req, res) => {
  Chude.create({
    IDchude: req.body.IDchude,
    tenchude: req.body.tenchude,
    ghichu: req.body.ghichu,
  }).then(() => {
    res.redirect("../chude");
  });
};

exports.capnhat_chude = async (req, res) => {
  await Chude.update(
    {
      IDchude: req.body.IDchude,
      tenchude: req.body.tenchude,
      ghichu: req.body.ghichu,
    },
    {
      where: {
        IDchude: req.params.IDchude,
      },
    }
  )
    .then(() => {
      res.redirect("../../../quanly/chude");
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

exports.xoa_chude = async (req, res) => {
  await Chude.destroy({
    where: {
      IDchude: req.params.IDchude,
    },
  })
    .then(() => {
      res.redirect("../../../quanly/chude");
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};
