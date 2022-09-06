
const controller = require("../../controllers/frontend/giangvien.controller");
module.exports = function(app) {
  
  app.get("/giangvien", controller.giangvien);
  
};