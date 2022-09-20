const controller = require("../controllers/dangkidetai");
const { permission } = require("../middleware");
module.exports = function (app) {
  app.get(
    "/sinhvien/dangkydetai",
    permission.requireLogin,
    controller.topic_gv
  );
  app.post(
    "/sinhvien/loc_topic_gv",
    permission.requireLogin,
    controller.loc_topic_gv
  );
  app.post(
    "/sinhvien/dangky_doan",
    permission.requireLogin,
    controller.dangky_doan
  );

  app.get(
    "/giangvien/dangkytopic",
    permission.requireLogin,
    controller.dangky_topic
  );
  app.post(
    "/giangvien/them_dangkytopic",
    permission.requireLogin,
    controller.them_dangkytopic
  );
  app.post(
    "/giangvien/sua_dangkytopic",
    permission.requireLogin,
    controller.capnhat_detai
  );
  app.get(
    "/giangvien/xoa_dangkytopic/:IDdetai",
    permission.requireLogin,
    controller.xoa_detai
  );
};
