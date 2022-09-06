require("dotenv").config();
const express = require("express");
var path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./app/models");
const Sequelize = require("sequelize");
const session = require("express-session");
const flash = require("connect-flash");
const app = express();
var corsOptions = {
  origin: "http://localhost:8081",
};
app.use(cors(corsOptions));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.set("views", path.join(__dirname, "app/views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "app/public")));

app.set("trust proxy", 1); // trust first proxy
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true },
  })
);
app.use(flash());
const PORT = process.env.PORT || 8008;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

// const dbc = require("./app/models");
// dbc.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and Resync Db");
// });

// // Requiring the module
// const reader = require("xlsx");

// // Reading our test file
// const file = reader.readFile("./app/public/uploads/test.xlsx");

// let data = [];

// const sheets = file.SheetNames;

// for (let i = 0; i < sheets.length; i++) {
//   console.log(sheets.length);
//   const temp = reader.utils.sheet_to_json(file.Sheets[file.SheetNames[i]]);
//   temp.forEach((res) => {
//     data.push(res);
//   });
// }

// // Printing data
// console.log(data);

require("./app/routes/auth.routes")(app);
require("./app/routes/taikhoan.routes")(app);
require("./app/routes/index.routes")(app);
require("./app/routes/chuyennghanh.routes")(app);
require("./app/routes/tintuc.routes")(app);
require("./app/routes/lop.routes")(app);
require("./app/routes/giangvien.routes")(app);
require("./app/routes/detai.routes")(app);
require("./app/routes/sinhvien.routes")(app);
require("./app/routes/chude.routes")(app);
require("./app/routes/hoidong.routes")(app);

//role sinh vien
require("./app/routes/trangsinhvien.routes")(app);
require("./app/routes/timkiemdetai.routes")(app);
require("./app/routes/danhsachgiangvien.routes")(app);
require("./app/routes/nopdoan.routes")(app);
require("./app/routes/dangkydetai.routes")(app);
require("./app/routes/thongtintaikhoan.routes")(app);
require("./app/routes/caidatsinhvien.routes")(app);

//role giang vien
require("./app/routes/tranggiangvien.routes")(app);
require("./app/routes/duyetdanhsachdangky.routes")(app);

//front_end
require("./app/routes/frontend/trangchu.routes")(app);
require("./app/routes/frontend/detai.routes")(app);
require("./app/routes/frontend/sinhvien.routes")(app);
require("./app/routes/frontend/giangvien.routes")(app);
require("./app/routes/frontend/tintuc.routes")(app);
require("./app/routes/frontend/lienhe.routes")(app);
require("./app/routes/frontend/dangnhap.routes")(app);
