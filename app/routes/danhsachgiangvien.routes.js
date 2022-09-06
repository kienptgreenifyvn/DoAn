const { authJwt } = require("../middleware");
const controller = require("../controllers/danhsachgiangvien");
const multer = require("multer");
const bodyParser = require("body-parser");
const { permission } = require("../middleware");
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
  app.get(
    "/sinhvien/danhsachgiangvien",
    permission.requireLogin,
    controller.danhsach_giangvien
  );
  app.post(
    "/sinhvien/loc_giangvien",
    permission.requireLogin,
    controller.loc_giangvien
  );
  app.post("/sinhvien/sendMail", permission.requireLogin, controller.sendMail);
};
