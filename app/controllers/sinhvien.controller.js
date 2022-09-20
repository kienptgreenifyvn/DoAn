const db = require("../models");
var pool_db = require("../config/crdb.config").pool_db;
const config = require("../config/auth.config");
// const { user } = require("../models");
const Sinhvien = db.sinhvien;
const User = db.user;
const Op = db.Sequelize.Op;

exports.danhsach_sinhvien = (req, res) => {
  pool_db.connect(function (err, client, done) {
    if (err) {
      return console.error("error", err);
    }
    client.query(
      `SELECT * FROM sinhviens inner join lops on sinhviens."IDlop" = lops."IDlop" inner join users on sinhviens."id" = users."id" inner join donvis on sinhviens."IDdonvi" = donvis."IDdonvi"`,
      function (err, result) {
        done();

        if (err) {
          res.end();
          return console.error("error running query", err);
        } else {
          var ds_sinhvien = result;
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
                var lop = result;
                pool_db.connect(function (err, client, done) {
                  if (err) {
                    return console.error("error", err);
                  }
                  client.query(`SELECT * FROM donvis`, function (err, result) {
                    done();

                    if (err) {
                      res.end();
                      return console.error("error running query", err);
                    } else {
                      var donvi = result;
                      pool_db.connect(function (err, client, done) {
                        if (err) {
                          return console.error("error", err);
                        }
                        client.query(
                          `SELECT * FROM giangviens`,
                          function (err, result) {
                            done();

                            if (err) {
                              res.end();
                              return console.error("error running query", err);
                            } else {
                              var giangvien = result;
                              pool_db.connect(function (err, client, done) {
                                if (err) {
                                  return console.error("error", err);
                                }
                                client.query(
                                  `SELECT * FROM sinhviens `,
                                  function (err, result) {
                                    done();

                                    if (err) {
                                      res.end();
                                      return console.error(
                                        "error running query",
                                        err
                                      );
                                    } else {
                                      var chon_sinhvien = result;
                                      pool_db.connect(function (
                                        err,
                                        client,
                                        done
                                      ) {
                                        if (err) {
                                          return console.error("error", err);
                                        }
                                        client.query(
                                          `SELECT * FROM lops where "IDlop" != '${chon_sinhvien.rows[0].IDlop}' `,
                                          function (err, result) {
                                            done();

                                            if (err) {
                                              res.end();
                                              return console.error(
                                                "error running query",
                                                err
                                              );
                                            } else {
                                              var chon_lop = result;
                                              pool_db.connect(function (
                                                err,
                                                client,
                                                done
                                              ) {
                                                if (err) {
                                                  return console.error(
                                                    "error",
                                                    err
                                                  );
                                                }
                                                client.query(
                                                  `SELECT * FROM donvis where "IDdonvi" != ${chon_sinhvien.rows[0].IDdonvi} `,
                                                  function (err, result) {
                                                    done();

                                                    if (err) {
                                                      res.end();
                                                      return console.error(
                                                        "error running query",
                                                        err
                                                      );
                                                    } else {
                                                      var chon_donvi = result;

                                                      pool_db.connect(function (
                                                        err,
                                                        client,
                                                        done
                                                      ) {
                                                        if (err) {
                                                          return console.error(
                                                            "error",
                                                            err
                                                          );
                                                        }
                                                        client.query(
                                                          `SELECT * FROM giangviens where "IDgiangvien" != ${chon_sinhvien.rows[0].IDgiangvien} `,
                                                          function (
                                                            err,
                                                            result
                                                          ) {
                                                            done();

                                                            if (err) {
                                                              res.end();
                                                              return console.error(
                                                                "error running query",
                                                                err
                                                              );
                                                            } else {
                                                              var chon_giangvien =
                                                                result;
                                                              res.render(
                                                                "./sinhvien.ejs",
                                                                {
                                                                  chon_sinhvien:
                                                                    chon_sinhvien
                                                                      .rows[0],
                                                                  chon_lop:
                                                                    chon_lop,
                                                                  chon_donvi:
                                                                    chon_donvi,
                                                                  lop: lop,
                                                                  ds_sinhvien:
                                                                    ds_sinhvien,
                                                                  donvi: donvi,
                                                                  giangvien:
                                                                    giangvien,
                                                                  chon_giangvien:
                                                                    chon_giangvien,
                                                                }
                                                              );
                                                            }
                                                          }
                                                        );
                                                      });
                                                    }
                                                  }
                                                );
                                              });
                                            }
                                          }
                                        );
                                      });
                                    }
                                  }
                                );
                              });
                            }
                          }
                        );
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

exports.them_sinhvien = async (req, res) => {
  try {
    const {
      email,
      IDsinhvien,
      tensinhvien,
      gioitinh,
      namsinh,
      quequan,
      sodienthoai,
      khoadaotao,
      hedaotao,
      bacdaotao,
      diemtichluy,
      kynang,
      IDlop,
      IDdonvi,
    } = req.body;

    const newUser = {
      email: email,
      password: "123456",
      role: "sinhvien",
    };
    const user = await User.create(newUser);

    await Sinhvien.create({
      IDsinhvien: IDsinhvien,
      tensinhvien: tensinhvien,
      gioitinh: gioitinh,
      namsinh: namsinh,
      quequan: quequan,
      sodienthoai: sodienthoai,
      anhsinhvien: req.file.originalname,
      khoadaotao: khoadaotao,
      hedaotao: hedaotao,
      bacdaotao: bacdaotao,
      diemtichluy: diemtichluy,
      kynang: kynang,
      IDdonvi: IDdonvi,
      IDlop: IDlop,
      id: user.id,
    });

    return res.redirect("../../../quanly/sinhvien");
  } catch (err) {
    res.status(500).json({
      success: false,
      message: `${err.message}`,
    });
  }
};

exports.capnhat_sinhvien = async (req, res) => {
  const {
    IDsinhvien,
    tensinhvien,
    gioitinh,
    namsinh,
    quequan,
    sodienthoai,
    khoadaotao,
    hedaotao,
    bacdaotao,
    diemtichluy,
    kynang,
    IDlop,
    IDdonvi,
  } = req.body;
  await Sinhvien.update(
    {
      tensinhvien: tensinhvien,
      gioitinh: gioitinh,
      namsinh: namsinh,
      quequan: quequan,
      sodienthoai: sodienthoai,
      khoadaotao: khoadaotao,
      hedaotao: hedaotao,
      bacdaotao: bacdaotao,
      diemtichluy: diemtichluy,
      kynang: kynang,
      IDdonvi: IDdonvi,
      IDlop: IDlop,
    },
    {
      where: {
        IDsinhvien: req.params.IDsinhvien,
      },
    }
  )
    .then(() => {
      res.redirect("../../../quanly/sinhvien");
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

exports.xoa_sinhvien = async (req, res) => {
  await Sinhvien.destroy({
    where: {
      IDsinhvien: req.params.IDsinhvien,
    },
  })
    .then(() => {
      res.redirect("../../../quanly/sinhvien");
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

exports.timkiem_sinhvien = (req, res) => {
  pool_db.connect(function (err, client, done) {
    if (err) {
      return console.error("error", err);
    }
    const detai = req.body.IDdetai;
    const chude = req.body.IDchude;
    const lop = req.body.IDlop;
    const giangvien = req.body.IDgiangvien;
    client.query(
      `SELECT * FROM sinhviens inner join lops on sinhviens."IDlop" = lops."IDlop" inner join detais on sinhviens."IDdetai" = detais."IDdetai" inner join chudes on sinhviens."IDchude" = chudes."IDchude" inner join giangviens on sinhviens."IDgiangvien" = giangviens."IDgiangvien" where sinhviens."IDgiangvien" = ${giangvien} or sinhviens."IDdetai" = ${detai} or sinhviens."IDlop" = ${lop} or sinhviens."IDchude" = ${chude}`,
      function (err, result) {
        done();

        if (err) {
          res.end();
          return console.error("error running query", err);
        } else {
          res.send(result.rows);
        }
      }
    );
  });
};
