
const controller = require("../../controllers/frontend/tintuc.controller");
module.exports = function(app) {
  
  app.get("/tintuc", controller.tintuc);
  
};