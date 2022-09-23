const db = require("../models");
var pool_db = require("../config/crdb.config").pool_db;
const config = require("../config/auth.config");
const Sinhvien = db.sinhvien;

exports.nopdoan = (req, res) => {
  const sinhvien = req.session.sinhvien;
  if (sinhvien.IDdetai == null || sinhvien.IDgiangvien == null) {
    return res.render("./chuanopdoan.ejs", { sinhvien });
  }

  pool_db.connect(function (err, client, done) {
    if (err) {
      return console.error("error", err);
    }
    client.query(
      `SELECT sinhviens.*, detais.*,giangviens."IDgiangvien",giangviens."tengiangvien",lops."tenlop",donvis."tendonvi" FROM sinhviens inner join giangviens on giangviens."IDgiangvien" = sinhviens."IDgiangvien" inner join detais on sinhviens."IDdetai" = detais."IDdetai" inner join users on sinhviens."id" = users."id" inner join lops on sinhviens."IDlop" = lops."IDlop" inner join donvis on sinhviens."IDdonvi" = donvis."IDdonvi" where sinhviens."IDsinhvien" = ${sinhvien.IDsinhvien}`,
      function (err, result) {
        done();
        if (err) {
          res.end();
          return console.error("error running query", err);
        } else {
          var ds_sinhvien = result;
          const k = new Date(sinhvien.namsinh).getDate();
          res.status(200).render("nopdoan.ejs", {
            sinhvien,
            k,
            ds_sinhvien: ds_sinhvien.rows[0],
          });
        }
      }
    );
  });
};
exports.capnhat_doan = async (req, res) => {
  const sinhvien = req.session.sinhvien;
  await Sinhvien.update(
    {
      IDsinhvien: req.body.IDsinhvien,
      tensinhvien: req.body.tensinhvien,
      gioitinh: req.body.gioitinh,
      namsinh: req.body.namsinh,
      quequan: req.body.quequan,
      sodienthoai: req.body.sodienthoai,
      sourcecode: req.file.originalname,
      khoadaotao: req.body.khoadaotao,
      hedaotao: req.body.hedaotao,
      bacdaotao: req.body.bacdaotao,
      id: req.body.id,
      IDdetai: req.body.IDdetai,
      IDlop: req.body.IDlop,
      IDchude: req.body.IDchude,
      IDgiangvien: req.body.IDgiangvien,
    },
    {
      where: {
        IDsinhvien: sinhvien.IDsinhvien,
      },
    }
  )
    .then((mess) => {
      res.status(200).redirect("../../sinhvien/nopdoan");
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};
