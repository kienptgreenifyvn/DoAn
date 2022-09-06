module.exports = (sequelize, Sequelize) => {
  const Thongbao = sequelize.define("thongbaos", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
    },
    noidung: {
      type: Sequelize.STRING,
    },
  });
  return Thongbao;
};
