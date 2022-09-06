
const controller = require("../../controllers/frontend/lienhe.controller");
module.exports = function(app) {
  
  app.get("/lienhe", controller.lienhe);
  
};