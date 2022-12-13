/* eslint-disable max-len */
const Sequelize = require('sequelize');

module.exports = class Product extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
      deviceId: {
        type: Sequelize.INTEGER,
        // foreignKey: true,
        allowNull: false,
      },
      productId: {
        type: Sequelize.INTEGER,
      },
      fair: {
        type: Sequelize.STRING,
      },
      dice: {
        type: Sequelize.INTEGER,
      },
      color: {
        type: Sequelize.ENUM('빨간색', '흰색'),
      },
    }, {
      sequelize,
      // tableName: 'tableName', // table명을 수동으로 생성 함
      // freezeTableName: true, // true: table명의 복수형 변환을 막음
      underscored: true, // true: underscored, false: camelCase
      timestamps: true, // createAt, updatedAt
      paranoid: false, // deletedAt
    });
  }
  // static associate(db){
  //   db.Product.belongsTo(db.Device, { foreignKey: 'deviceId', targetKey: 'id'});
  // }
};
