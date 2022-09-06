const { authJwt } = require("../middleware");
const controller = require("../controllers/hoidong.controller");
module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  app.get("/quanly/hoidong", controller.danhsach_hoidong);
  app.post("/quanly/hoidong/them_hoidong", controller.them_hoidong);
  app.post("/quanly/hoidong/sua_hoidong/:IDhoidong", controller.capnhat_hoidong);
  app.get("/quanly/hoidong/xoa_hoidong/:IDhoidong", controller.xoa_hoidong);
 
};