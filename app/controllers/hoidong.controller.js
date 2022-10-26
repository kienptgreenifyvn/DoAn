const db = require("../models");
const hoidong = db.hoidong;
const Op = db.Sequelize.Op;
var pool_db = require("../config/crdb.config").pool_db;
const config = require("../config/auth.config");

exports.danhsach_hoidong = (req, res) => {
  pool_db.connect(function (err, client, done) {
    if (err) {
      return console.error("error", err);
    }
    client.query(`SELECT * FROM hoidongs`, function (err, result) {
      done();

      if (err) {
        res.end();
        return console.error("error running query", err);
      } else {
        const DS_hoidong = result;
        pool_db.connect(function (err, client, done) {
          if (err) {
            return console.error("error", err);
          }
          client.query(
            `SELECT * FROM hoidongs inner join giangviens on hoidongs."IDhoidong" = giangviens."IDhoidong"`,
            function (err, result) {
              done();

              if (err) {
                res.end();
                return console.error("error running query", err);
              } else {
                const HDGV = result;
                res.render("./hoidong.ejs", {
                  DS_hoidong: DS_hoidong,
                  HDGV: HDGV,
                });
              }
            }
          );
        });
      }
    });
  });
};

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
