const { authJwt } = require("../middleware");
const controller = require("../controllers/chuyennghanh.controller");

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
  app.get("/quanly/chuyennghanh", controller.danhsach_chuyennghanh);
  app.post(
    "/quanly/chuyennghanh/them_chuyennghanh",
    controller.them_chuyennghanh
  );
  app.post(
    "/quanly/chuyennghanh/upload",
    upload.single("file"),
    controller.upload
  );
  app.post(
    "/quanly/chuyennghanh/sua_chuyennghanh/:IDdonvi",
    controller.capnhat_chuyennghanh
  );
  app.get(
    "/quanly/chuyennghanh/xoa_chuyennghanh/:IDdonvi",
    controller.xoa_chuyennghanh
  );
};
