const db = require("../models");
var pool_db = require("../config/crdb.config").pool_db;
const config = require("../config/auth.config");
const { giangvien } = require("../models");
const Giangvien = db.giangvien;
const Op = db.Sequelize.Op;
const nodemailer = require("nodemailer");

exports.danhsach_giangvien = (req, res) => {
  const sinhvien = req.session.sinhvien;
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
                res.render("./danhsachgiangvien.ejs", {
                  ds_giangvien: ds_giangvien,
                  donvi: donvi,
                  sinhvien: sinhvien,
                });
              }
            });
          });
        }
      }
    );
  });
};
exports.loc_giangvien = (req, res) => {
  const sinhvien = req.session.sinhvien;
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
                res.render("./danhsachgiangvien.ejs", {
                  ds_giangvien: ds_giangvien,
                  donvi: donvi,
                  sinhvien: sinhvien,
                });
              }
            });
          });
        }
      }
    );
  });
};

exports.sendMail = (req, res) => {
  const sinhvien = req.session.sinhvien;
  pool_db.connect(function (err, client, done) {
    if (err) {
      return console.error("error", err);
    }
    client.query(
      `SELECT * FROM sinhviens inner join users on users."id" = sinhviens."id" where sinhviens."IDsinhvien" = ${sinhvien.IDsinhvien}  `,
      function (err, result) {
        done();

        if (err) {
          res.end();
          return console.error("error running query", err);
        } else {
          var transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
              user: "phamtrungkienk28cc@gmail.com",
              pass: "gerrqhrriktwueqw",
            },
          });

          var mailOptions = {
            from: `phamtrungkienk28cc@gmail.com`,
            to: `${req.body.emailgiangvien}`,
            subject: `${req.body.tieude}`,
            text: ``,
            html: `<b>Th??ng tin ng?????i g???i : </b><br>
            <b>M?? sinh vi??n :</b> ${result.rows[0].IDsinhvien}<br>
            <b>T??n sinh vi??n :</b> ${result.rows[0].tensinhvien}<br>
            <b>Email sinh vi??n :</b> ${result.rows[0].email}<br>
            <b>S??? ??i???n tho???i :</b> ${result.rows[0].sodienthoai}<br>
            <b>N???i dung :</b>   <br>${req.body.noidung}`,
          };

          transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
              console.log(error);
            } else {
              console.log("Email sent: " + info.response);
            }
          });
        }
        return res.json({
          message: "G???i mail cho gi???ng vi??n th??nh c??ng !",
        });
      }
    );
  });
};
