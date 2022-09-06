const db = require("../models");
var pool_db = require("../config/crdb.config").pool_db;
const config = require("../config/auth.config");
const Giangvien = db.giangvien;
const Detai = db.detai;
const Sinhvien = db.sinhvien;
const Thongbao = db.thongbao;
const Op = db.Sequelize.Op;

exports.danhsachsinhviendangky = (req, res) => {
  const giangvien = req.session.giangvien;
  pool_db.connect(function (err, client, done) {
    if (err) {
      return console.error("error", err);
    }
    client.query(
      `SELECT * FROM detais  inner join giangviens on giangviens."IDgiangvien" = detais."IDgiangvien" where giangviens."IDgiangvien" = ${giangvien.IDgiangvien} and detais."isConfim" =true `,
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
            client.query(
              `SELECT sinhviens.*, detais.*,giangviens."IDgiangvien",giangviens."tengiangvien",lops."tenlop",donvis."tendonvi" FROM sinhviens inner join giangviens on giangviens."IDgiangvien" = sinhviens."IDgiangvien" inner join detais on sinhviens."IDdetai" = detais."IDdetai" inner join users on sinhviens."id" = users."id" inner join lops on sinhviens."IDlop" = lops."IDlop" inner join donvis on sinhviens."IDdonvi" = donvis."IDdonvi" where giangviens."IDgiangvien" = ${giangvien.IDgiangvien} and sinhviens."isActive"=true`,
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
                    client.query(
                      `SELECT * FROM chudes`,
                      function (err, result) {
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
                              `SELECT * FROM lops`,
                              function (err, result) {
                                done();

                                if (err) {
                                  res.end();
                                  return console.error(
                                    "error running query",
                                    err
                                  );
                                } else {
                                  var lop = result;

                                  res.render("./dssinhviendangky.ejs", {
                                    ds_detai: ds_detai,
                                    chude: chude,
                                    lop: lop,
                                    ds_sinhvien: ds_sinhvien,
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
      }
    );
  });
};

exports.loc_danhsachsinhviendangky = (req, res) => {
  const giangvien = req.session.giangvien;
  pool_db.connect(function (err, client, done) {
    if (err) {
      return console.error("error", err);
    }
    client.query(
      `SELECT * FROM detais  inner join giangviens on giangviens."IDgiangvien" = detais."IDgiangvien" where giangviens."IDgiangvien" = ${giangvien.IDgiangvien} and detais."isConfim" =true `,
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
            client.query(
              `SELECT sinhviens.*, detais.*,giangviens."IDgiangvien",giangviens."tengiangvien",lops."tenlop",donvis."tendonvi" FROM sinhviens inner join giangviens on giangviens."IDgiangvien" = sinhviens."IDgiangvien" inner join detais on sinhviens."IDdetai" = detais."IDdetai" inner join users on sinhviens."id" = users."id" inner join lops on sinhviens."IDlop" = lops."IDlop" inner join donvis on sinhviens."IDdonvi" = donvis."IDdonvi" where giangviens."IDgiangvien" = ${
                giangvien.IDgiangvien
              } and sinhviens."isActive"=true and 1 = 1 ${
                req.body.IDchude != ""
                  ? ` and detais."IDchude" = ${req.body.IDchude}`
                  : ""
              } ${
                req.body.IDlop != ""
                  ? ` and sinhviens."IDlop" = ${req.body.IDlop}`
                  : ""
              }`,
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
                    client.query(
                      `SELECT * FROM chudes`,
                      function (err, result) {
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
                              `SELECT * FROM lops`,
                              function (err, result) {
                                done();

                                if (err) {
                                  res.end();
                                  return console.error(
                                    "error running query",
                                    err
                                  );
                                } else {
                                  var lop = result;

                                  res.render("./dssinhviendangky.ejs", {
                                    ds_detai: ds_detai,
                                    chude: chude,
                                    lop: lop,
                                    ds_sinhvien: ds_sinhvien,
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
      }
    );
  });
};

exports.chapnhan = async (req, res) => {
  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }
  const giangvien = req.session.giangvien;
  await Thongbao.create({
    id: getRandomInt(2000),
    noidung: `Giảng viên ${giangvien.tengiangvien} đã đồng ý hướng dẫn bạn !`,
    IDsinhvien: req.body.IDsinhvien,
  });
  await Sinhvien.update(
    {
      isBook: true,
      isActive: false,
    },
    {
      where: {
        IDsinhvien: req.body.IDsinhvien,
      },
    }
  )
    .then(() => {
      Sinhvien.update(
        {
          IDdetai: null,
          IDgiangvien: null,
          isActive: false,
          isBook: false,
        },
        {
          where: {
            IDgiangvien: giangvien.IDgiangvien,
            isActive: true,
          },
        }
      );
      Detai.update(
        {
          isConfim: false,
        },
        {
          where: {
            IDdetai: req.body.IDdetai,
          },
        }
      );
      return res.json({ message: "Bạn đã đồng ý hướng dẫn sinh viên" });
      //res.status(200).redirect("../../giangvien/dssinhviendangky");
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

exports.tuchoi = async (req, res) => {
  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }
  const giangvien = req.session.giangvien;
  await Thongbao.create({
    id: getRandomInt(2000),
    noidung: `Giảng viên ${giangvien.tengiangvien} đã từ chối hướng dẫn bạn !`,
    IDsinhvien: req.body.IDsinhvien,
  });
  await Sinhvien.update(
    {
      IDdetai: null,
      IDgiangvien: null,
      isActive: false,
      isBook: false,
    },
    {
      where: {
        IDsinhvien: req.body.IDsinhvien,
      },
    }
  )
    .then(() => {
      res.json({
        message: "Bạn đã từ chối hướng dẫn sinh viên",
      });
      //res.status(200).redirect("../../giangvien/dssinhviendangky");
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

exports.quanlyhuongdan = (req, res) => {
  const giangvien = req.session.giangvien;
  pool_db.connect(function (err, client, done) {
    if (err) {
      return console.error("error", err);
    }
    client.query(
      `SELECT * FROM sinhviens inner join donvis on sinhviens."IDdonvi" = donvis."IDdonvi" inner join giangviens on giangviens."IDgiangvien" = sinhviens."IDgiangvien" inner join detais on sinhviens."IDdetai" = detais."IDdetai" inner join users on sinhviens."id" = users."id" inner join lops on sinhviens."IDlop" = lops."IDlop" inner join chudes on detais."IDchude" = chudes."IDchude" where giangviens."IDgiangvien" = ${giangvien.IDgiangvien} and sinhviens."isBook" = true `,
      function (err, result) {
        done();

        if (err) {
          res.end();
          return console.error("error running query", err);
        } else {
          var huongdan = result;
          pool_db.connect(function (err, client, done) {
            if (err) {
              return console.error("error", err);
            }
            client.query(
              `SELECT * FROM detais where detais."IDgiangvien" = ${giangvien.IDgiangvien} `,
              function (err, result) {
                done();

                if (err) {
                  res.end();
                  return console.error("error running query", err);
                } else {
                  var detai = result;
                  res.render("./quanlyhuongdan.ejs", {
                    huongdan: huongdan,
                    detai: detai,
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
};

exports.loc_quanlyhuongdan = (req, res) => {
  const giangvien = req.session.giangvien;
  pool_db.connect(function (err, client, done) {
    if (err) {
      return console.error("error", err);
    }
    client.query(
      `SELECT * FROM sinhviens inner join donvis on sinhviens."IDdonvi" = donvis."IDdonvi" inner join giangviens on giangviens."IDgiangvien" = sinhviens."IDgiangvien" inner join detais on sinhviens."IDdetai" = detais."IDdetai" inner join users on sinhviens."id" = users."id" inner join lops on sinhviens."IDlop" = lops."IDlop" inner join chudes on detais."IDchude" = chudes."IDchude" where giangviens."IDgiangvien" = ${
        giangvien.IDgiangvien
      } and sinhviens."isBook" = true and 1 = 1 ${
        req.body.IDdetai != ""
          ? ` and detais."IDdetai" = ${req.body.IDdetai}`
          : ""
      } `,
      function (err, result) {
        done();

        if (err) {
          res.end();
          return console.error("error running query", err);
        } else {
          var huongdan = result;
          pool_db.connect(function (err, client, done) {
            if (err) {
              return console.error("error", err);
            }
            client.query(
              `SELECT * FROM detais where detais."IDgiangvien" = ${giangvien.IDgiangvien} `,
              function (err, result) {
                done();

                if (err) {
                  res.end();
                  return console.error("error running query", err);
                } else {
                  var detai = result;
                  res.render("./quanlyhuongdan.ejs", {
                    huongdan: huongdan,
                    detai: detai,
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
};

exports.quanlydoanhuongdan = (req, res) => {
  const giangvien = req.session.giangvien;
  pool_db.connect(function (err, client, done) {
    if (err) {
      return console.error("error", err);
    }
    client.query(
      `SELECT * FROM detais inner join chudes on detais."IDchude" = chudes."IDchude" inner join sinhviens on detais."IDdetai" = sinhviens."IDdetai" inner join giangviens on giangviens."IDgiangvien" = detais."IDgiangvien" inner join donvis on donvis."IDdonvi" = giangviens."IDdonvi" where giangviens."IDgiangvien" = ${giangvien.IDgiangvien} and detais."isActive" = true `,
      function (err, result) {
        done();

        if (err) {
          res.end();
          return console.error("error running query", err);
        } else {
          var huongdan = result;
          pool_db.connect(function (err, client, done) {
            if (err) {
              return console.error("error", err);
            }
            client.query(
              `SELECT * FROM detais where detais."IDgiangvien" = ${giangvien.IDgiangvien} `,
              function (err, result) {
                done();

                if (err) {
                  res.end();
                  return console.error("error running query", err);
                } else {
                  var detai = result;
                  res.render("./doanhuongdan.ejs", {
                    huongdan: huongdan,
                    detai: detai,
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
};
