module.exports = (sequelize, Sequelize) => {
  const Detai = sequelize.define("detais", {
    IDdetai: {
      type: Sequelize.INTEGER,
      primaryKey: true,
    },
    tendetai: {
      type: Sequelize.TEXT,
    },
    thoigianbatdau: {
      type: Sequelize.DATE,
    },
    thoigianketthuc: {
      type: Sequelize.DATE,
    },
    isActive: {
      type: Sequelize.BOOLEAN,
      default: false,
    },
    isConfim: {
      type: Sequelize.BOOLEAN,
      default: false,
    },
  });
  return Detai;
};
