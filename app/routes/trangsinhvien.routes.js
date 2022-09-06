const controller = require("../controllers/trangsinhvien");
const { permission } = require("../middleware");
module.exports = function (app) {
  app.get("/sinhvien", permission.requireLogin, controller.trangsinhvien);
};
