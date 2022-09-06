const { authJwt } = require("../middleware");
const controller = require("../controllers/nopdoan");
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
  app.get("/sinhvien/nopdoan", permission.requireLogin, controller.nopdoan);
  app.post(
    "/sinhvien/up_nopdoan",
    permission.requireLogin,
    upload.single("sourceCode"),
    controller.capnhat_doan
  );
};
