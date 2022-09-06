const { authJwt } = require("../middleware");
const controller = require("../controllers/taikhoan.controller");
module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  app.get("/quanly/taikhoan", controller.danhsach_taikhoan);
  app.post("/quanly/taikhoan/them_taikhoan", controller.them_taikhoan);
  app.post("/quanly/taikhoan/sua_taikhoan/:id", controller.capnhat_taikhoan);
  app.get("/quanly/taikhoan/xoa_taikhoan/:id", controller.xoa_taikhoan);
 
};