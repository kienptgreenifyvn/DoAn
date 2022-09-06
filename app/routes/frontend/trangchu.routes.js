
const controller = require("../../controllers/frontend/trangchu.controler");
module.exports = function(app) {
  
  app.get("/trangchu", controller.trangchu);
  
};