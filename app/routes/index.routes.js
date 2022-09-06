
const controller = require("../controllers/index.controller");
module.exports = function(app) {
  
  app.get("/quanly", controller.index);
  
};