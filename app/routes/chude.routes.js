const { authJwt } = require("../middleware");
const controller = require("../controllers/chude.controller");
module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  app.get("/quanly/chude", controller.danhsach_chude);
  app.post("/quanly/chude/them_chude", controller.them_chude);
  app.post("/quanly/chude/sua_chude/:IDchude", controller.capnhat_chude);
  app.get("/quanly/chude/xoa_chude/:IDchude", controller.xoa_chude);
 
};