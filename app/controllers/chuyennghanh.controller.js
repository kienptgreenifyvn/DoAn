const db = require("../models");
var pool_db = require("../config/crdb.config").pool_db;
const config = require("../config/auth.config");
const ChuyenNghanh = db.donvi;
const Sinhvien = db.sinhvien;
const User = db.user;
const readXlsxFile = require("read-excel-file/node");
const nodemailer = require("nodemailer");

exports.upload = async (req, res) => {
  try {
    if (req.file == undefined) {
      return res.status(400).send("Please upload an excel file!");
    }
    readXlsxFile("./app/public/uploads/" + req.file.originalname).then(
      (rows) => {
        // skip header
        rows.shift(rows);
        let users = [];
        let students = [];
        rows.forEach((row) => {
          let user = {
            id: row[0],
            email: row[1],
            password: 123456,
            role: "sinhvien",
          };

          let student = {
            IDsinhvien: row[0],
            tensinhvien: row[2],
            gioitinh: row[3],
            namsinh: row[4],
            sodienthoai: row[5],
            quequan: row[6],
            anhsinhvien: "icon_user.png",
            bacdaotao: row[7],
            hedaotao: row[8],
            khoadaotao: row[9],
            diemtichluy: row[10],
            kynang: row[11],
            isActive: false,
            isBook: false,
            dotbaove: req.body.dotbaove,
            namthuchien: new Date().getFullYear(),
            IDdonvi: req.body.IDdonvi,
            IDlop: row[12],
            id: row[0],
          };
          students.push(student);
          users.push(user);
          var transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
              user: "phamtrungkienk28cc@gmail.com",
              pass: "gerrqhrriktwueqw",
            },
          });

          var mailOptions = {
            from: "phamtrungkienk28cc@gmail.com",
            to: row[1],
            subject: "Thông tin đăng nhập của bạn !",
            text: ``,
            html: `<b>Email: </b> ${row[1]}    </br>
                  <b>Mật khẩu: 123456</b>`,
          };

          transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
              console.log(error);
            } else {
              console.log("Email sent: " + info.response);
            }
          });
        });
        User.bulkCreate(users).then(() => {
          console.log("thêm tài khoản thành công");
        });
        Sinhvien.bulkCreate(students).then(() => {
          console.log("thêm sinh viên thành công thành công");
        });

        res.redirect("../chuyennghanh");
      }
    );
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Could not upload the file: " + req.file.originalname,
    });
  }
};

exports.danhsach_chuyennghanh = (req, res) => {
  ChuyenNghanh.findAll().then((ds_chuyennghanh) => {
    // res.json(ds_khoa);
    res.render("./chuyennghanh.ejs", { DS_chuyennghanh: ds_chuyennghanh });
  });
};

exports.them_chuyennghanh = (req, res) => {
  ChuyenNghanh.create({
    IDdonvi: req.body.IDdonvi,
    tendonvi: req.body.tendonvi,
    diachi: req.body.diachi,
    sodienthoai: req.body.sodienthoai,
    truongdonvi: req.body.truongdonvi,
  }).then(() => {
    res.redirect("../chuyennghanh");
  });
};

exports.capnhat_chuyennghanh = async (req, res) => {
  await ChuyenNghanh.update(
    {
      IDdonvi: req.body.IDdonvi,
      tendonvi: req.body.tendonvi,
      diachi: req.body.diachi,
      sodienthoai: req.body.sodienthoai,
      truongdonvi: req.body.truongdonvi,
    },
    {
      where: {
        IDdonvi: req.params.IDdonvi,
      },
    }
  )
    .then(() => {
      res.redirect("../../../quanly/chuyennghanh");
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

exports.xoa_chuyennghanh = async (req, res) => {
  await ChuyenNghanh.destroy({
    where: {
      IDdonvi: req.params.IDdonvi,
    },
  })
    .then(() => {
      res.redirect("../../../quanly/chuyennghanh");
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};
