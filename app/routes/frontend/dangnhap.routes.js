
const controller = require("../../controllers/frontend/dangnhap.controller");
module.exports = function(app) {
  
  app.get("/dangnhap", controller.dangnhap);
  
};