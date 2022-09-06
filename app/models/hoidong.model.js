module.exports = (sequelize, Sequelize) => {
  const Hoidong = sequelize.define("hoidongs", {
    IDhoidong: {
      type: Sequelize.INTEGER,
      primaryKey: true,
    },
    chutichhoidong: {
      type: Sequelize.TEXT,
    },
    sothanhvien: {
      type: Sequelize.INTEGER,
    },
    nhanxet: {
      type: Sequelize.TEXT,
    },
    diemhoidong: {
      type: Sequelize.FLOAT,
    },
  });
  return Hoidong;
};
