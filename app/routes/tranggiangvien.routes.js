const controller = require("../controllers/tranggiangvien");
const { requireLogin } = require("../middleware/permission");
module.exports = function (app) {
  app.get("/giangvien", requireLogin, controller.tranggiangvien);
};
