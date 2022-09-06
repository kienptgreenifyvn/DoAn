const db = require("../models");
var pool_db = require("../config/crdb.config").pool_db;
const config = require("../config/auth.config");
const Giangvien = db.giangvien;
const Sinhvien = db.sinhvien;
const Op = db.Sequelize.Op;

exports.tranggiangvien = (req, res) => {
  const giangvien = req.session.giangvien;
  pool_db.connect(function (err, client, done) {
    if (err) {
      return console.error("error", err);
    }
    client.query(
      `SELECT * FROM giangviens  inner join thongbaos on giangviens."IDgiangvien" = thongbaos."IDgiangvien"  where giangviens."IDgiangvien" = ${giangvien.IDgiangvien} `,
      function (err, result) {
        done();

        if (err) {
          res.end();
          return console.error("error running query", err);
        } else {
          var thongbao = result;
          pool_db.connect(function (err, client, done) {
            if (err) {
              return console.error("error", err);
            }
            client.query(`SELECT * FROM tintucs`, function (err, result) {
              done();

              if (err) {
                res.end();
                return console.error("error running query", err);
              } else {
                var tintuc = result;
                pool_db.connect(function (err, client, done) {
                  if (err) {
                    return console.error("error", err);
                  }
                  client.query(
                    `SELECT COUNT(*) FROM detais inner join giangviens on giangviens."IDgiangvien" = detais."IDgiangvien"  inner join chudes on detais."IDchude" = chudes."IDchude" where giangviens."IDgiangvien" = ${giangvien.IDgiangvien} `,
                    function (err, result) {
                      done();

                      if (err) {
                        res.end();
                        return console.error("error running query", err);
                      } else {
                        var topic = result;
                        pool_db.connect(function (err, client, done) {
                          if (err) {
                            return console.error("error", err);
                          }
                          client.query(
                            `SELECT COUNT(*) FROM sinhviens inner join donvis on sinhviens."IDdonvi" = donvis."IDdonvi" inner join giangviens on giangviens."IDgiangvien" = sinhviens."IDgiangvien" inner join detais on sinhviens."IDdetai" = detais."IDdetai" inner join users on sinhviens."id" = users."id" inner join lops on sinhviens."IDlop" = lops."IDlop" inner join chudes on detais."IDchude" = chudes."IDchude" where giangviens."IDgiangvien" = ${giangvien.IDgiangvien} and sinhviens."isBook" = true`,
                            function (err, result) {
                              done();

                              if (err) {
                                res.end();
                                return console.error(
                                  "error running query",
                                  err
                                );
                              } else {
                                var sinhviendahuongdan = result;
                                pool_db.connect(function (err, client, done) {
                                  if (err) {
                                    return console.error("error", err);
                                  }
                                  client.query(
                                    `SELECT COUNT(*) FROM detais inner join chudes on detais."IDchude" = chudes."IDchude" inner join sinhviens on detais."IDdetai" = sinhviens."IDdetai" inner join giangviens on giangviens."IDgiangvien" = detais."IDgiangvien" inner join donvis on donvis."IDdonvi" = giangviens."IDdonvi" where giangviens."IDgiangvien" = ${giangvien.IDgiangvien} and detais."isActive" = true `,
                                    function (err, result) {
                                      done();

                                      if (err) {
                                        res.end();
                                        return console.error(
                                          "error running query",
                                          err
                                        );
                                      } else {
                                        var doandahuongdan = result;
                                        res.render("./tranggiangvien.ejs", {
                                          thongbao: thongbao,
                                          tintuc: tintuc,
                                          doandahuongdan:
                                            doandahuongdan.rows[0],
                                          sinhviendahuongdan:
                                            sinhviendahuongdan.rows[0],
                                          topic: topic.rows[0],
                                          giangvien: giangvien,
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
