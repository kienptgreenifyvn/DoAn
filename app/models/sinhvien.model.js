module.exports = (sequelize, Sequelize) => {
  const Sinhvien = sequelize.define("sinhviens", {
    IDsinhvien: {
      type: Sequelize.INTEGER,
      primaryKey: true,
    },
    tensinhvien: {
      type: Sequelize.TEXT,
    },
    gioitinh: {
      type: Sequelize.TEXT,
    },
    namsinh: {
      type: Sequelize.DATE,
    },
    quequan: {
      type: Sequelize.TEXT,
    },
    sodienthoai: {
      type: Sequelize.INTEGER,
    },
    sourcecode: {
      type: Sequelize.TEXT,
    },
    bacdaotao: {
      type: Sequelize.STRING,
    },
    hedaotao: {
      type: Sequelize.STRING,
    },
    khoadaotao: {
      type: Sequelize.STRING,
    },
    diemtichluy: {
      type: Sequelize.STRING,
    },
    kynang: {
      type: Sequelize.STRING,
    },
    anhsinhvien: {
      type: Sequelize.STRING,
    },
    isActive: {
      type: Sequelize.BOOLEAN,
      default: false,
    },
    isBook: {
      type: Sequelize.BOOLEAN,
      default: false,
    },
  });
  return Sinhvien;
};
