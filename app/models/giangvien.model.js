module.exports = (sequelize, Sequelize) => {
  const Giangvien = sequelize.define("giangviens", {
    IDgiangvien: {
      type: Sequelize.INTEGER,
      primaryKey: true,
    },
    tengiangvien: {
      type: Sequelize.TEXT,
    },
    gioitinh: {
      type: Sequelize.TEXT,
    },
    namsinh: {
      type: Sequelize.DATE,
    },
    sodienthoai: {
      type: Sequelize.INTEGER,
    },
    diachi: {
      type: Sequelize.TEXT,
    },
    hocvi: {
      type: Sequelize.TEXT,
    },
    chucvu: {
      type: Sequelize.TEXT,
    },
    Khoa: {
      type: Sequelize.TEXT,
    },
    anhgiangvien: {
      type: Sequelize.TEXT,
    },
    huongnghiencuu: {
      type: Sequelize.TEXT,
    },
    isActive: {
      type: Sequelize.BOOLEAN,
      default: false,
    },
  });
  return Giangvien;
};
