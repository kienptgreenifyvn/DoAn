module.exports = (sequelize, Sequelize) => {
    const Tintuc = sequelize.define("tintucs", {
        IDtintuc: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
          },
        chude: {
            type: Sequelize.TEXT
        },
        noidung: {
            type: Sequelize.TEXT
        },
        ngaydang: {
            type: Sequelize.DATE
        },
        anhtintuc: {
            type: Sequelize.TEXT
        }

      
    });
  
    return Tintuc;
  };