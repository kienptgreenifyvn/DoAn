
const controller = require("../../controllers/frontend/detai.controller");
module.exports = function(app) {
  
  app.get("/detai", controller.detai);
  
};