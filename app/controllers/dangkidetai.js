const db = require("../models");
var pool_db = require("../config/crdb.config").pool_db;
const config = require("../config/auth.config");
const Detai = db.detai;
const Op = db.Sequelize.Op;
const Sinhvien = db.sinhvien;
const Thongbao = db.thongbao;

exports.topic_gv = (req, res) => {
  const sinhvien = req.session.sinhvien;
  pool_db.connect(function (err, client, done) {
    if (err) {
      return console.error("error", err);
    }
    client.query(
      `SELECT detais.*,giangviens."tengiangvien",giangviens."IDgiangvien", donvis."tendonvi", donvis."IDdonvi",chudes."tenchude" FROM detais inner join chudes on detais."IDchude" = chudes."IDchude" inner join giangviens on giangviens."IDgiangvien" = detais."IDgiangvien" inner join donvis on donvis."IDdonvi" = giangviens."IDdonvi" where detais."isConfim" = false `,
      function (err, result) {
        done();
        if (err) {
          res.end();
          return console.error("error running query", err);
        } else {
          var ds_gv = result;
          pool_db.connect(function (err, client, done) {
            if (err) {
              return console.error("error", err);
            }
            client.query(`SELECT * FROM chudes `, function (err, result) {
              done();

              if (err) {
                res.end();
                return console.error("error running query", err);
              } else {
                var chude = result;
                pool_db.connect(function (err, client, done) {
                  if (err) {
                    return console.error("error", err);
                  }
                  client.query(`SELECT * FROM donvis `, function (err, result) {
                    done();

                    if (err) {
                      res.end();
                      return console.error("error running query", err);
                    } else {
                      var donvi = result;
                      res.render("./dangkydetai.ejs", {
                        ds_gv: ds_gv,
                        chude: chude,
                        donvi: donvi,
                        sinhvien: sinhvien,
                      });
                    }
                  });
                });
              }
            });
          });
        }
      }
    );
  });
};

exports.loc_topic_gv = (req, res) => {
  const sinhvien = req.session.sinhvien;

  pool_db.connect(function (err, client, done) {
    if (err) {
      return console.error("error", err);
    }
    client.query(
      `SELECT detais.*,giangviens."tengiangvien",giangviens."IDgiangvien", donvis."tendonvi", donvis."IDdonvi",chudes."tenchude"  FROM detais inner join chudes on detais."IDchude" = chudes."IDchude" inner join giangviens on giangviens."IDgiangvien" = detais."IDgiangvien" inner join donvis on donvis."IDdonvi" = giangviens."IDdonvi" where detais."isActive" =false and 1 = 1 ${
        req.body.IDchude != ""
          ? ` and detais."IDchude" = ${req.body.IDchude}`
          : ""
      } ${
        req.body.IDdonvi != ""
          ? ` and giangviens."IDdonvi" = ${req.body.IDdonvi}`
          : ""
      }`,
      function (err, result) {
        done();
        if (err) {
          res.end();
          return console.error("error running query", err);
        } else {
          var ds_gv = result;
          pool_db.connect(function (err, client, done) {
            if (err) {
              return console.error("error", err);
            }
            client.query(`SELECT * FROM chudes `, function (err, result) {
              done();

              if (err) {
                res.end();
                return console.error("error running query", err);
              } else {
                var chude = result;
                pool_db.connect(function (err, client, done) {
                  if (err) {
                    return console.error("error", err);
                  }
                  client.query(`SELECT * FROM donvis `, function (err, result) {
                    done();

                    if (err) {
                      res.end();
                      return console.error("error running query", err);
                    } else {
                      var donvi = result;
                      res.render("./dangkydetai.ejs", {
                        ds_gv: ds_gv,
                        chude: chude,
                        donvi: donvi,
                        sinhvien: sinhvien,
                      });
                    }
                  });
                });
              }
            });
          });
        }
      }
    );
  });
};

exports.dangky_doan = async (req, res) => {
  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }
  const sinhvien = req.session.sinhvien;
  if (sinhvien.IDdetai != null) {
    return res.json({ message: "Bạn đã đăng ký 1 đề tài khác rồi" });
  }
  await Detai.update(
    {
      isConfim: true,
    },
    {
      where: {
        IDdetai: req.body.IDdetai,
      },
    }
  );
  await Thongbao.create({
    id: getRandomInt(1000),
    noidung: `Sinh viên ${sinhvien.tensinhvien} đã đăng ký đề tài của bạn !`,
    IDgiangvien: req.body.IDgiangvien,
  });
  await Sinhvien.update(
    {
      IDdetai: req.body.IDdetai,
      IDgiangvien: req.body.IDgiangvien,
      isActive: true,
    },
    {
      where: {
        IDsinhvien: sinhvien.IDsinhvien,
      },
    }
  )
    .then(() => {
      return res.json({ message: "Bạn đã đăng ký thành công!" });
      //res.status(200).redirect("../../sinhvien/dangkydetai");
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

exports.dangky_topic = (req, res) => {
  const giangvien = req.session.giangvien;
  pool_db.connect(function (err, client, done) {
    if (err) {
      return console.error("error", err);
    }
    client.query(
      `SELECT detais."tendetai",detais."IDdetai",giangviens.*, chudes."tenchude" FROM detais inner join giangviens on giangviens."IDgiangvien" = detais."IDgiangvien"  inner join chudes on detais."IDchude" = chudes."IDchude" where giangviens."IDgiangvien" = ${giangvien.IDgiangvien} `,
      function (err, result) {
        done();
        if (err) {
          res.end();
          return console.error("error running query", err);
        } else {
          var ds_gv = result;
          pool_db.connect(function (err, client, done) {
            if (err) {
              return console.error("error", err);
            }
            client.query(`SELECT * FROM chudes `, function (err, result) {
              done();

              if (err) {
                res.end();
                return console.error("error running query", err);
              } else {
                var chude = result;
                res.render("./dangkytopic_gv.ejs", {
                  ds_gv: ds_gv,
                  chude: chude,
                  giangvien: giangvien,
                });
              }
            });
          });
        }
      }
    );
  });
};

exports.them_dangkytopic = async (req, res) => {
  const giangvien = req.session.giangvien;
  pool_db.connect(function (err, client, done) {
    if (err) {
      return console.error("error", err);
    }
    client.query(
      `SELECT detais."IDdetai" FROM detais `,
      function (err, result) {
        done();

        if (err) {
          res.end();
          return console.error("error running query", err);
        } else {
          const detai = result.rows.map((e) => {
            return e.IDdetai;
          });
          const max = Math.max.apply(Math, detai);
          Detai.create({
            IDdetai: max + 1,
            tendetai: req.body.tendetai,
            IDchude: req.body.IDchude,
            isActive: false,
            isConfim: false,
            IDgiangvien: giangvien.IDgiangvien,
          }).then(() => {
            res.json({ message: "Thêm đề tài thành công!" });
            // res.redirect("../../giangvien/dangkytopic");
          });
        }
      }
    );
  });
};

exports.capnhat_detai = async (req, res) => {
  await Detai.update(
    {
      IDdetai: Number(req.body.IDdetai),
      tendetai: req.body.tendetai,
      IDhoidong: 1,
      IDchude: req.body.IDchude,
    },
    {
      where: {
        IDdetai: Number(req.body.IDdetai),
      },
    }
  )
    .then(() => {
      res.json("../../../giangvien/dangkytopic");
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({ message: err.message });
    });
};

exports.xoa_detai = async (req, res) => {
  await Detai.destroy({
    where: {
      IDdetai: req.params.IDdetai,
    },
  })
    .then(() => {
      res.redirect("../../../giangvien/dangkytopic");
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};
