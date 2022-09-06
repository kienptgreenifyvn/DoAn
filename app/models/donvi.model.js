module.exports = (sequelize, Sequelize) => {
    const Donvi = sequelize.define("donvis", {
      IDdonvi: {
        type: Sequelize.INTEGER,
        primaryKey: true
      },
      tendonvi: {
        type: Sequelize.TEXT
      },
      diachi: {
        type: Sequelize.TEXT
      },
      sodienthoai: {
        type: Sequelize.INTEGER
      },
      truongdonvi: {
        type: Sequelize.TEXT
      }
    });
    return Donvi;
  };