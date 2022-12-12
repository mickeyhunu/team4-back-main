/* eslint-disable max-len */
const Sequelize = require('sequelize');

module.exports = class Device extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
      deviceId: {
        type: Sequelize.INTEGER,
        unique: true,
        allowNull: false,
      },

      DataTime: { //0
        type: Sequelize.STRING,
      },
      Start: {    //1
        type: Sequelize.STRING,
      },
      No1PartsError: {    //2
        type: Sequelize.STRING,
      },
      No1_Action: {   //3
        type: Sequelize.STRING,
      },
      No2_Action: {   //4
        type: Sequelize.STRING,
      },
      No3Ready: {   //5
        type: Sequelize.STRING,
      },
      ColorSensor: {  //6
        type: Sequelize.STRING,
      },
      VisionSensor: {  //7
        type: Sequelize.STRING,
      },
      Reset: {  //8
        type: Sequelize.STRING,
      },
      no1_on_off: {  //9
        type: Sequelize.STRING,
      },
      no2_on_off: {  //10
        type: Sequelize.STRING,
      },
      no3_on_off: {  //11
        type: Sequelize.STRING,
      },
      seonsor1_on_off: {  //12
        type: Sequelize.STRING,
      },
      seonsor2_on_off: {  //13
        type: Sequelize.STRING,
      },
      No1Delay: {  //14
        type: Sequelize.STRING,
      },
      No1Count: {  //15
        type: Sequelize.STRING,
      },
      No2Count: {  //16
        type: Sequelize.STRING,
      },
      No3Count: {  //17
        type: Sequelize.STRING,
      },
      lamp_green: {  //18
        type: Sequelize.STRING,
      },
      lamp_yellow: {  //19
        type: Sequelize.STRING,
      },
      lamp_red: {  //20
        type: Sequelize.STRING,
      },
      No3Motor1: {  //21
        type: Sequelize.STRING,
      },
      No3Motor2: {  //22
        type: Sequelize.STRING,
      },
      No1ChipFull: {  //23
        type: Sequelize.STRING,
      },
      No2Chip: {  //24
        type: Sequelize.STRING,
      },
      No2CubeFull: {  //25
        type: Sequelize.STRING,
      },
      No2InPoint: {  //26
        type: Sequelize.STRING,
      },
      No2OutPoint: {  //27
        type: Sequelize.STRING,
      },
      No2Sol: {  //28
        type: Sequelize.STRING,
      },
      No2SolAction: {  //29
        type: Sequelize.STRING,
      },
      No2BackToSquare: {  //30
        type: Sequelize.STRING,
      },
      No2Mode: {  //31
        type: Sequelize.STRING,
      },
      No3Chip: {  //32
        type: Sequelize.STRING,
      },
      VisionCmdMemory: {  //33
        type: Sequelize.STRING,
      },
      No3DiceReading: {  //34
        type: Sequelize.STRING,
      },
      Emergency: {  //35
        type: Sequelize.STRING,
      },
      OutputLimit: {  //36
        type: Sequelize.STRING,
      },
      DiceValue: {  //37
        type: Sequelize.STRING,
      },
      DiceComparisonValue: {  //38
        type: Sequelize.STRING,
      },
      ColorSensorSensing: {  //39
        type: Sequelize.STRING,
      },
      No3Gripper: {  //40
        type: Sequelize.STRING,
      },      
    }, {
      sequelize,
      // tableName: 'tableName', // table명을 수동으로 생성 함
      // freezeTableName: true, // true: table명의 복수형 변환을 막음
      underscored: true, // true: underscored, false: camelCase
      timestamps: true, // createAt, updatedAt
      paranoid: true, // deletedAt
    });
  }

  // static associate(db) {
  // }
};
