const db = require("../models");
var pool_db = require("../config/crdb.config").pool_db;
const config = require("../config/auth.config");
const Lop = db.lop;
const Op = db.Sequelize.Op;

exports.danhsach_lop = (req, res) => {
  pool_db.connect(function (err, client, done) {
    if (err) {
      return console.error("error", err);
    }
    client.query(`SELECT * FROM lops`, function (err, result) {
      done();

      if (err) {
        res.end();
        return console.error("error running query", err);
      } else {
        res.render("./lop.ejs", { ds_lop: result });
      }
    });
  });
};
exports.timkiem_lop = (req, res) => {
  Lop.findOne({
    where: {
      IDhedaotao: req.body.IDhedaotao,
      IDbacdaotao: req.body.IDbacdaotao,
    },
  }).then((ds_lop) => {
    console.log(ds_lop);
    res.render("./seachlop.ejs", { ds_lop: ds_lop });
  });
};
exports.them_lop = (req, res) => {
  Lop.create({
    IDlop: req.body.IDlop,
    tenlop: req.body.tenlop,
    sosinhvien: req.body.sosinhvien,
  }).then(() => {
    res.redirect("../lop");
  });
};

exports.capnhat_lop = async (req, res) => {
  await Lop.update(
    {
      IDlop: req.body.IDlop,
      tenlop: req.body.tenlop,
      sosinhvien: req.body.sosinhvien,
    },
    {
      where: {
        IDlop: req.params.IDlop,
      },
    }
  )
    .then(() => {
      res.redirect("../../../quanly/lop");
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

exports.xoa_lop = async (req, res) => {
  await Lop.destroy({
    where: {
      IDlop: req.params.IDlop,
    },
  })
    .then(() => {
      res.redirect("../../../quanly/lop");
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};
