const db = require("../models");
var pool_db = require("../config/crdb.config").pool_db;
const config = require("../config/auth.config");
exports.index = (req, res) => {
  pool_db.connect(function (err, client, done) {
    if (err) {
      return console.error("error", err);
    }
    client.query(`SELECT COUNT(*) FROM donvis`, function (err, result) {
      done();

      if (err) {
        res.end();
        return console.error("error running query", err);
      } else {
        const donvi = result;
        pool_db.connect(function (err, client, done) {
          if (err) {
            return console.error("error", err);
          }
          client.query(`SELECT COUNT(*) FROM lops`, function (err, result) {
            done();

            if (err) {
              res.end();
              return console.error("error running query", err);
            } else {
              const lop = result;
              pool_db.connect(function (err, client, done) {
                if (err) {
                  return console.error("error", err);
                }
                client.query(
                  `SELECT COUNT(*) FROM detais `,
                  function (err, result) {
                    done();

                    if (err) {
                      res.end();
                      return console.error("error running query", err);
                    } else {
                      const detai = result;
                      pool_db.connect(function (err, client, done) {
                        if (err) {
                          return console.error("error", err);
                        }
                        client.query(
                          `SELECT COUNT(*) FROM giangviens`,
                          function (err, result) {
                            done();

                            if (err) {
                              res.end();
                              return console.error("error running query", err);
                            } else {
                              const giangvien = result;
                              pool_db.connect(function (err, client, done) {
                                if (err) {
                                  return console.error("error", err);
                                }
                                client.query(
                                  `SELECT COUNT(*) FROM sinhviens`,
                                  function (err, result) {
                                    done();

                                    if (err) {
                                      res.end();
                                      return console.error(
                                        "error running query",
                                        err
                                      );
                                    } else {
                                      const sinhvien = result;
                                      pool_db.connect(function (
                                        err,
                                        client,
                                        done
                                      ) {
                                        if (err) {
                                          return console.error("error", err);
                                        }
                                        client.query(
                                          `SELECT COUNT(*) FROM users`,
                                          function (err, result) {
                                            done();

                                            if (err) {
                                              res.end();
                                              return console.error(
                                                "error running query",
                                                err
                                              );
                                            } else {
                                              const taikhoan = result;
                                              res
                                                .status(200)
                                                .render("index.ejs", {
                                                  donvi: donvi.rows[0],
                                                  lop: lop.rows[0],
                                                  detai: detai.rows[0],
                                                  giangvien: giangvien.rows[0],
                                                  sinhvien: sinhvien.rows[0],
                                                  taikhoan: taikhoan.rows[0],
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
};
