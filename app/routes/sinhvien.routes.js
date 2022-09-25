const { authJwt } = require("../middleware");
const controller = require("../controllers/sinhvien.controller");
const multer = require("multer");
const bodyParser = require("body-parser");
var urlencodedParser = bodyParser.urlencoded({ extended: false });
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
  app.get("/quanly/sinhvien", controller.danhsach_sinhvien);
  app.post("/quanly/loc_sinhvien", controller.loc_danhsach_sinhvien);
  app.post(
    "/quanly/sinhvien/them_sinhvien",
    upload.single("file"),
    controller.them_sinhvien
  );
  app.post(
    "/quanly/sinhvien/sua_sinhvien/:IDsinhvien",
    upload.single("sourcecode"),
    controller.capnhat_sinhvien
  );
  app.get("/quanly/sinhvien/xoa_sinhvien/:IDsinhvien", controller.xoa_sinhvien);
  app.get("/quanly/sinhvien/timkiem_sinhvien", controller.timkiem_sinhvien);
};
