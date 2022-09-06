const { authJwt } = require("../middleware");
const controller = require("../controllers/thongtintaikhoan");
const multer = require("multer");
const bodyParser = require("body-parser");
var urlencodedParser = bodyParser.urlencoded({ extended: false });
const { permission } = require("../middleware");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./app/public/uploads");
  },
  filename: function (req, file, cb) {
    console.log(file);
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: storage });
module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  app.get(
    "/sinhvien/thongtintaikhoan",
    permission.requireLogin,
    controller.thongtintaikhoan_sv
  );
  app.post(
    "/sinhvien/capnhatthongtin",
    permission.requireLogin,
    upload.single("anh"),
    controller.capnhatthongtin_sv
  );

  app.get(
    "/giangvien/thongtintaikhoan",
    permission.requireLogin,
    controller.thongtintaikhoan_gv
  );
  app.post(
    "/giangvien/capnhatthongtin",
    permission.requireLogin,
    upload.single("anh"),
    controller.capnhatthongtin_gv
  );
};
