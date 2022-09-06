const { authJwt } = require("../middleware");
const controller = require("../controllers/caidatsinhvien");
const { permission } = require("../middleware");
module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  app.get(
    "/sinhvien/caidat",
    permission.requireLogin,
    controller.caidatsinhvien
  );
  app.post(
    "/sinhvien/capnhatmatkhau",
    permission.requireLogin,
    controller.capnhatmatkhau
  );
  app.get(
    "/giangvien/caidat",
    permission.requireLogin,
    controller.caidatgiangvien
  );
  app.post(
    "/giangvien/capnhatmatkhau",
    permission.requireLogin,
    controller.capnhatmatkhau_gv
  );
};
