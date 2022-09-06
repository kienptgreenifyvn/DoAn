const { authJwt } = require("../middleware");
const controller = require("../controllers/timkiemdetai");
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
    "/sinhvien/timkiemdetai",
    permission.requireLogin,
    controller.danhsach_detai_sv
  );
  app.post("/sinhvien/locdetai", permission.requireLogin, controller.loc_detai);
  app.get(
    "/giangvien/timkiemdetai",
    permission.requireLogin,
    controller.danhsach_detai_gv
  );
  app.post(
    "/giangvien/locdetai_gv",
    permission.requireLogin,
    controller.loc_detaigv
  );
};
