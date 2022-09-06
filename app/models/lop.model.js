module.exports = (sequelize, Sequelize) => {
  const Lop = sequelize.define("lops", {
    IDlop: {
      type: Sequelize.STRING,
      primaryKey: true,
    },
    tenlop: {
      type: Sequelize.TEXT,
    },
    sosinhvien: {
      type: Sequelize.INTEGER,
    },
  });
  return Lop;
};
