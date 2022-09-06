const { authJwt } = require("../middleware");
const controller = require("../controllers/lop.controller");
module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  app.get("/quanly/lop", controller.danhsach_lop);
  app.post("/quanly/lop/them_lop", controller.them_lop);
  app.post("/quanly/lop/timkiem_lop", controller.timkiem_lop);
  app.post("/quanly/lop/sua_lop/:IDlop", controller.capnhat_lop);
  app.get("/quanly/lop/xoa_lop/:IDlop", controller.xoa_lop);
 
};