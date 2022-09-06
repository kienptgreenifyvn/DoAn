
const controller = require("../../controllers/frontend/sinhvien.controller");
module.exports = function(app) {
  
  app.get("/sinhvien", controller.sinhvien);
  
};