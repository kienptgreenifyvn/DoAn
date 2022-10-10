const config = require("../config/db.config.js");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
  host: config.HOST,
  dialect: config.dialect,
  operatorsAliases: false,
  pool: {
    max: config.pool.max,
    min: config.pool.min,
    acquire: config.pool.acquire,
    idle: config.pool.idle,
  },
});
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.user = require("../models/user.model.js")(sequelize, Sequelize);
db.role = require("../models/role.model.js")(sequelize, Sequelize);
db.chude = require("../models/chude.model")(sequelize, Sequelize);
db.detai = require("../models/detai.model")(sequelize, Sequelize);
db.donvi = require("../models/donvi.model")(sequelize, Sequelize);
db.giangvien = require("../models/giangvien.model")(sequelize, Sequelize);
db.hoidong = require("../models/hoidong.model")(sequelize, Sequelize);
db.lop = require("../models/lop.model")(sequelize, Sequelize);
db.sinhvien = require("../models/sinhvien.model")(sequelize, Sequelize);
db.tintuc = require("../models/tintuc.model")(sequelize, Sequelize);
db.thongbao = require("../models/thongbao.model")(sequelize, Sequelize);

db.detai.belongsTo(db.chude, { foreignKey: "IDchude" });
db.detai.belongsTo(db.hoidong, { foreignKey: "IDhoidong" });
db.detai.belongsTo(db.giangvien, { foreignKey: "IDgiangvien" });
db.sinhvien.belongsTo(db.donvi, { foreignKey: "IDdonvi" });
db.sinhvien.belongsTo(db.user, { foreignKey: "id" });
db.giangvien.belongsTo(db.user, { foreignKey: "id" });
db.giangvien.belongsTo(db.hoidong, { foreignKey: "IDhoidong" });
db.sinhvien.belongsTo(db.lop, { foreignKey: "IDlop" });
db.sinhvien.belongsTo(db.detai, { foreignKey: "IDdetai" });
db.sinhvien.belongsTo(db.giangvien, { foreignKey: "IDgiangvien" });
db.giangvien.belongsTo(db.donvi, { foreignKey: "IDdonvi" });
db.thongbao.belongsTo(db.sinhvien, { foreignKey: "IDsinhvien" });
db.thongbao.belongsTo(db.giangvien, { foreignKey: "IDgiangvien" });

db.ROLES = ["user", "admin", "moderator"];
module.exports = db;
