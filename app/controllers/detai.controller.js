const db = require("../models");
var pool_db = require("../config/crdb.config").pool_db;
const config = require("../config/auth.config");
const Detai = db.detai;
const Op = db.Sequelize.Op;

exports.danhsach_detai = (req, res) => {
  pool_db.connect(function (err, client, done) {
    if (err) {
      return console.error("error", err);
    }
    client.query(
      `SELECT * FROM detais inner join chudes on detais."IDchude" = chudes."IDchude" inner join hoidongs on detais."IDhoidong" = hoidongs."IDhoidong" inner join sinhviens on sinhviens."IDdetai" = detais."IDdetai" inner join giangviens on giangviens."IDgiangvien" = detais."IDgiangvien"`,
      function (err, result) {
        done();

        if (err) {
          res.end();
          return console.error("error running query", err);
        } else {
          var ds_detai = result;
          pool_db.connect(function (err, client, done) {
            if (err) {
              return console.error("error", err);
            }
            client.query(`SELECT * FROM chudes`, function (err, result) {
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
                  client.query(
                    `SELECT * FROM hoidongs`,
                    function (err, result) {
                      done();

                      if (err) {
                        res.end();
                        return console.error("error running query", err);
                      } else {
                        var hoidong = result;

                        pool_db.connect(function (err, client, done) {
                          if (err) {
                            return console.error("error", err);
                          }
                          client.query(
                            `SELECT * FROM detais inner join chudes on detais."IDchude" = chudes."IDchude" inner join hoidongs on detais."IDhoidong" = hoidongs."IDhoidong"`,
                            function (err, result) {
                              done();

                              if (err) {
                                res.end();
                                return console.error(
                                  "error running query",
                                  err
                                );
                              } else {
                                var chon_detai = result;
                                pool_db.connect(function (err, client, done) {
                                  if (err) {
                                    return console.error("error", err);
                                  }
                                  client.query(
                                    `SELECT * FROM chudes where "IDchude" != ${chon_detai.rows[0].IDchude} `,
                                    function (err, result) {
                                      done();

                                      if (err) {
                                        res.end();
                                        return console.error(
                                          "error running query",
                                          err
                                        );
                                      } else {
                                        var chon_chude = result;
                                        pool_db.connect(function (
                                          err,
                                          client,
                                          done
                                        ) {
                                          if (err) {
                                            return console.error("error", err);
                                          }
                                          client.query(
                                            `SELECT * FROM hoidongs where "IDhoidong" != ${chon_detai.rows[0].IDhoidong} `,
                                            function (err, result) {
                                              done();

                                              if (err) {
                                                res.end();
                                                return console.error(
                                                  "error running query",
                                                  err
                                                );
                                              } else {
                                                var chon_hoidong = result;
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
                                                    `SELECT * FROM donvis  `,
                                                    function (err, result) {
                                                      done();

                                                      if (err) {
                                                        res.end();
                                                        return console.error(
                                                          "error running query",
                                                          err
                                                        );
                                                      } else {
                                                        var donvi = result;
                                                        res.render(
                                                          "./detai.ejs",
                                                          {
                                                            chon_detai:
                                                              chon_detai
                                                                .rows[0],
                                                            chon_chude:
                                                              chon_chude,
                                                            chon_hoidong:
                                                              chon_hoidong,
                                                            chude: chude,
                                                            ds_detai: ds_detai,
                                                            hoidong: hoidong,
                                                            donvi: donvi,
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
      }
    );
  });
};

exports.loc_danhsach_detai = (req, res) => {
  pool_db.connect(function (err, client, done) {
    if (err) {
      return console.error("error", err);
    }
    client.query(
      `SELECT * FROM detais inner join chudes on detais."IDchude" = chudes."IDchude" inner join hoidongs on detais."IDhoidong" = hoidongs."IDhoidong" inner join sinhviens on sinhviens."IDdetai" = detais."IDdetai" inner join giangviens on giangviens."IDgiangvien" = detais."IDgiangvien" where  1 = 1 ${
        req.body.IDchude != ""
          ? ` and detais."IDchude" = ${req.body.IDchude}`
          : ""
      } ${
        req.body.IDdonvi != ""
          ? ` and sinhviens."IDdonvi" = ${req.body.IDdonvi}`
          : ""
      } ${
        req.body.isActive != ""
          ? ` and detais."isActive" = ${req.body.isActive}`
          : ""
      } ${
        req.body.nam != ""
          ? ` and sinhviens."namthuchien" = '${req.body.nam}'`
          : ""
      }`,
      function (err, result) {
        done();

        if (err) {
          res.end();
          return console.error("error running query", err);
        } else {
          var ds_detai = result;
          pool_db.connect(function (err, client, done) {
            if (err) {
              return console.error("error", err);
            }
            client.query(`SELECT * FROM chudes`, function (err, result) {
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
                  client.query(
                    `SELECT * FROM hoidongs`,
                    function (err, result) {
                      done();

                      if (err) {
                        res.end();
                        return console.error("error running query", err);
                      } else {
                        var hoidong = result;

                        pool_db.connect(function (err, client, done) {
                          if (err) {
                            return console.error("error", err);
                          }
                          client.query(
                            `SELECT * FROM detais inner join chudes on detais."IDchude" = chudes."IDchude" inner join hoidongs on detais."IDhoidong" = hoidongs."IDhoidong"`,
                            function (err, result) {
                              done();

                              if (err) {
                                res.end();
                                return console.error(
                                  "error running query",
                                  err
                                );
                              } else {
                                var chon_detai = result;
                                pool_db.connect(function (err, client, done) {
                                  if (err) {
                                    return console.error("error", err);
                                  }
                                  client.query(
                                    `SELECT * FROM chudes where "IDchude" != ${chon_detai.rows[0].IDchude} `,
                                    function (err, result) {
                                      done();

                                      if (err) {
                                        res.end();
                                        return console.error(
                                          "error running query",
                                          err
                                        );
                                      } else {
                                        var chon_chude = result;
                                        pool_db.connect(function (
                                          err,
                                          client,
                                          done
                                        ) {
                                          if (err) {
                                            return console.error("error", err);
                                          }
                                          client.query(
                                            `SELECT * FROM hoidongs where "IDhoidong" != ${chon_detai.rows[0].IDhoidong} `,
                                            function (err, result) {
                                              done();

                                              if (err) {
                                                res.end();
                                                return console.error(
                                                  "error running query",
                                                  err
                                                );
                                              } else {
                                                var chon_hoidong = result;
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
                                                    `SELECT * FROM donvis  `,
                                                    function (err, result) {
                                                      done();

                                                      if (err) {
                                                        res.end();
                                                        return console.error(
                                                          "error running query",
                                                          err
                                                        );
                                                      } else {
                                                        var donvi = result;
                                                        res.render(
                                                          "./detai.ejs",
                                                          {
                                                            chon_detai:
                                                              chon_detai
                                                                .rows[0],
                                                            chon_chude:
                                                              chon_chude,
                                                            chon_hoidong:
                                                              chon_hoidong,
                                                            chude: chude,
                                                            ds_detai: ds_detai,
                                                            hoidong: hoidong,
                                                            donvi: donvi,
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
      }
    );
  });
};

exports.them_detai = (req, res) => {
  Detai.create({
    IDdetai: req.body.IDdetai,
    tendetai: req.body.tendetai,
    sosinhvienthamgia: req.body.sosinhvienthamgia,
    nam: req.body.nam,
    nhanxetchung: req.body.nhanxetchung,
    IDchude: req.body.IDchude,
    IDhoidong: req.body.IDhoidong,
  }).then(() => {
    res.redirect("../detai");
  });
};

exports.capnhat_detai = async (req, res) => {
  await Detai.update(
    {
      IDdetai: req.body.IDdetai,
      tendetai: req.body.tendetai,
      sosinhvienthamgia: req.body.sosinhvienthamgia,
      nam: req.body.nam,
      nhanxetchung: req.body.nhanxetchung,
      IDchude: req.body.IDchude,
      IDhoidong: req.body.IDhoidong,
    },
    {
      where: {
        IDdetai: req.params.IDdetai,
      },
    }
  )
    .then(() => {
      res.redirect("../../../quanly/detai");
    })
    .catch((err) => {
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
      res.redirect("../../../quanly/detai");
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};
