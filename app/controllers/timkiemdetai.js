const db = require("../models");
var pool_db = require("../config/crdb.config").pool_db;
const config = require("../config/auth.config");
const { sinhvien } = require("../models");
const Detai = db.detai;
const Op = db.Sequelize.Op;

exports.danhsach_detai_sv = (req, res) => {
  const sinhvien = req.session.sinhvien;
  pool_db.connect(function (err, client, done) {
    if (err) {
      return console.error("error", err);
    }
    client.query(
      `SELECT * FROM detais inner join chudes on detais."IDchude" = chudes."IDchude" inner join sinhviens on detais."IDdetai" = sinhviens."IDdetai" inner join giangviens on giangviens."IDgiangvien" = detais."IDgiangvien" inner join donvis on donvis."IDdonvi" = giangviens."IDdonvi" where detais."isActive" = true  `,
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
                      res.render("./timkiemdetai.ejs", {
                        ds_detai: ds_detai,
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

exports.loc_detai = (req, res) => {
  const sinhvien = req.session.sinhvien;
  pool_db.connect(function (err, client, done) {
    if (err) {
      return console.error("error", err);
    }
    client.query(
      `SELECT * FROM detais inner join chudes on detais."IDchude" = chudes."IDchude" inner join sinhviens on detais."IDdetai" = sinhviens."IDdetai" inner join giangviens on giangviens."IDgiangvien" = detais."IDgiangvien" inner join donvis on donvis."IDdonvi" = giangviens."IDdonvi" where detais."isActive" = true  and 1 = 1 ${
        req.body.IDchude != ""
          ? ` and detais."IDchude" = ${req.body.IDchude}`
          : ""
      } ${
        req.body.IDdonvi != ""
          ? ` and giangviens."IDdonvi" = ${req.body.IDdonvi}`
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
                      res.render("./timkiemdetai.ejs", {
                        ds_detai: ds_detai,
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

exports.danhsach_detai_gv = (req, res) => {
  const giangvien = req.session.giangvien;
  pool_db.connect(function (err, client, done) {
    if (err) {
      return console.error("error", err);
    }
    client.query(
      `SELECT * FROM detais inner join chudes on detais."IDchude" = chudes."IDchude" inner join sinhviens on detais."IDdetai" = sinhviens."IDdetai" inner join giangviens on giangviens."IDgiangvien" = detais."IDgiangvien" inner join donvis on donvis."IDdonvi" = giangviens."IDdonvi" where detais."isActive" = true `,
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
            client.query(`SELECT * FROM chudes `, function (err, result) {
              done();

              if (err) {
                res.end();
                return console.error("error running query", err);
              } else {
                var chude = result;
                res.render("./timkiemdetaigv.ejs", {
                  ds_detai: ds_detai,
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

exports.loc_detaigv = (req, res) => {
  const giangvien = req.session.giangvien;
  pool_db.connect(function (err, client, done) {
    if (err) {
      return console.error("error", err);
    }
    client.query(
      `SELECT * FROM detais inner join chudes on detais."IDchude" = chudes."IDchude" inner join sinhviens on detais."IDdetai" = sinhviens."IDdetai" inner join giangviens on giangviens."IDgiangvien" = detais."IDgiangvien" inner join donvis on donvis."IDdonvi" = giangviens."IDdonvi" where detais."isActive" = true and 1 = 1 ${
        req.body.IDchude != ""
          ? ` and detais."IDchude" = ${req.body.IDchude}`
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
                      res.render("./timkiemdetaigv.ejs", {
                        ds_detai: ds_detai,
                        chude: chude,
                        donvi: donvi,
                        giangvien: giangvien,
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
