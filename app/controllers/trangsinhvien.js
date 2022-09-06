const db = require("../models");
var pool_db = require("../config/crdb.config").pool_db;
const config = require("../config/auth.config");
const Giangvien = db.giangvien;
const Sinhvien = db.sinhvien;
const Op = db.Sequelize.Op;

exports.trangsinhvien = (req, res) => {
  const sinhvien = req.session.sinhvien;
  pool_db.connect(function (err, client, done) {
    if (err) {
      return console.error("error", err);
    }
    client.query(
      `SELECT * FROM sinhviens  inner join giangviens on giangviens."IDgiangvien" = sinhviens."IDgiangvien" inner join detais on sinhviens."IDdetai" = detais."IDdetai" where sinhviens."isBook" = true `,
      function (err, result) {
        done();

        if (err) {
          res.end();
          return console.error("error running query", err);
        } else {
          var sv_dangky = result;
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
                    `SELECT * FROM sinhviens  inner join thongbaos on sinhviens."IDsinhvien" = thongbaos."IDsinhvien"  where sinhviens."IDsinhvien" = ${sinhvien.IDsinhvien}`,
                    function (err, result) {
                      done();

                      if (err) {
                        res.end();
                        return console.error("error running query", err);
                      } else {
                        var thongbao = result;
                        res.render("./trangsinhvien.ejs", {
                          sv_dangky: sv_dangky,
                          tintuc: tintuc,
                          thongbao: thongbao,
                          sinhvien: sinhvien,
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
