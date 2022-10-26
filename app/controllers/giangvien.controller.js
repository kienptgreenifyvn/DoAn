const db = require("../models");
var pool_db = require("../config/crdb.config").pool_db;
const config = require("../config/auth.config");
const Giangvien = db.giangvien;
const User = db.user;
const Op = db.Sequelize.Op;

exports.danhsach_giangvien = (req, res) => {
  pool_db.connect(function (err, client, done) {
    if (err) {
      return console.error("error", err);
    }
    client.query(
      `SELECT * FROM giangviens  inner join donvis on giangviens."IDdonvi" = donvis."IDdonvi" inner join users on giangviens."id" = users."id"`,
      function (err, result) {
        done();

        if (err) {
          res.end();
          return console.error("error running query", err);
        } else {
          var ds_giangvien = result;
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
                    `SELECT * FROM giangviens inner join donvis on giangviens."IDdonvi" = donvis."IDdonvi"  `,
                    function (err, result) {
                      done();

                      if (err) {
                        res.end();
                        return console.error("error running query", err);
                      } else {
                        var chon_giangvien = result;
                        pool_db.connect(function (err, client, done) {
                          if (err) {
                            return console.error("error", err);
                          }
                          client.query(
                            `SELECT * FROM donvis where "IDdonvi" != ${chon_giangvien.rows[0]?.IDdonvi} `,
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
                                res.render("./giangvien.ejs", {
                                  chon_giangvien: chon_giangvien.rows[0],
                                  chon_donvi: chon_donvi,
                                  donvi: donvi,
                                  ds_giangvien: ds_giangvien,
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

exports.loc_danhsach_giangvien = (req, res) => {
  pool_db.connect(function (err, client, done) {
    if (err) {
      return console.error("error", err);
    }
    client.query(
      `SELECT * FROM giangviens  inner join donvis on giangviens."IDdonvi" = donvis."IDdonvi" inner join users on giangviens."id" = users."id" where 1 = 1 ${
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
          var ds_giangvien = result;
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
                    `SELECT * FROM giangviens inner join donvis on giangviens."IDdonvi" = donvis."IDdonvi"  `,
                    function (err, result) {
                      done();

                      if (err) {
                        res.end();
                        return console.error("error running query", err);
                      } else {
                        var chon_giangvien = result;
                        pool_db.connect(function (err, client, done) {
                          if (err) {
                            return console.error("error", err);
                          }
                          client.query(
                            `SELECT * FROM donvis where "IDdonvi" != ${chon_giangvien.rows[0]?.IDdonvi} `,
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
                                res.render("./giangvien.ejs", {
                                  chon_giangvien: chon_giangvien.rows[0],
                                  chon_donvi: chon_donvi,
                                  donvi: donvi,
                                  ds_giangvien: ds_giangvien,
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

exports.them_giangvien = async (req, res) => {
  try {
    const newUser = {
      id: req.body.IDgiangvien,
      email: req.body.email,
      password: "123456",
      role: "giangvien",
    };

    const user = await User.create(newUser);

    await Giangvien.create({
      IDgiangvien: req.body.IDgiangvien,
      tengiangvien: req.body.tengiangvien,
      gioitinh: req.body.gioitinh,
      namsinh: req.body.namsinh,
      sodienthoai: req.body.sodienthoai,
      diachi: req.body.diachi,
      hocvi: req.body.hocvi,
      chucvu: req.body.chucvu,
      anhgiangvien: req.file.originalname,
      huongnghiencuu: req.body.huongnghiencuu,
      isActive: false,
      Khoa: req.body.Khoa,
      IDdonvi: req.body.IDdonvi,
      id: user.id,
    });

    // return res.status(200).json({
    //   message: `Thêm giáo viên thành công !`,
    // });
    return res.redirect("../../../quanly/giangvien");
  } catch (err) {
    res.status(500).json({
      success: false,
      message: `${err.message}`,
    });
  }
};

exports.capnhat_giangvien = async (req, res) => {
  await Giangvien.update(
    {
      IDgiangvien: req.body.IDgiangvien,
      tengiangvien: req.body.tengiangvien,
      gioitinh: req.body.gioitinh,
      namsinh: req.body.namsinh,
      sodienthoai: req.body.sodienthoai,
      diachi: req.body.diachi,
      hocvi: req.body.hocvi,
      chucvu: req.body.chucvu[0],
      huongnghiencuu: req.body.huongnghiencuu,
      isActive: false,
      Khoa: req.body.Khoa,
      IDdonvi: req.body.IDdonvi,
    },
    {
      where: {
        IDgiangvien: req.params.IDgiangvien,
      },
    }
  )
    .then(() => {
      res.redirect("../../../quanly/giangvien");
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

exports.xoa_giangvien = async (req, res) => {
  pool_db.connect(function (err, client, done) {
    if (err) {
      return console.error("error", err);
    }
    client.query(
      `SELECT * FROM giangviens inner join users on giangviens."id" = users."id" where giangviens."IDgiangvien" = ${req.params.IDgiangvien}`,
      function (err, result) {
        done();

        if (err) {
          res.end();
          return console.error("error running query", err);
        } else {
          User.destroy({
            where: {
              id: result.rows[0].id,
            },
          });

          Giangvien.destroy({
            where: {
              IDgiangvien: req.params.IDgiangvien,
            },
          })
            .then(() => {
              return res.redirect("../../../quanly/giangvien");
            })
            .catch((err) => {
              return res.status(500).send({ message: err.message });
            });
        }
      }
    );
  });
};
