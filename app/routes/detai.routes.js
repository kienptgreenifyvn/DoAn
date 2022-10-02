const { authJwt } = require("../middleware");
const controller = require("../controllers/detai.controller");
const multer = require("multer");
const bodyParser = require("body-parser");
var urlencodedParser = bodyParser.urlencoded({ extended: false });
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./app/public/uploads");
  },
  filename: function (req, file, cb) {
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
  app.get("/quanly/detai", controller.danhsach_detai);
  app.post("/quanly/loc_detai", controller.loc_danhsach_detai);
  app.post(
    "/quanly/detai/them_detai",
    upload.single("image"),
    controller.them_detai
  );
  app.post("/quanly/detai/sua_detai/:IDdetai", controller.capnhat_detai);
  app.get("/quanly/detai/xoa_detai/:IDdetai", controller.xoa_detai);
};
