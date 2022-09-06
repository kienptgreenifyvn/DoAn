module.exports = (sequelize, Sequelize) => {
    const Chude = sequelize.define("chudes", {
      IDchude: {
        type: Sequelize.INTEGER,
        primaryKey: true
      },
      tenchude: {
        type: Sequelize.TEXT
      },
      ghichu: {
        type: Sequelize.TEXT
      }
    });
    return Chude;
  };