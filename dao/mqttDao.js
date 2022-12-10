// const { Op } = require('sequelize');
const { Device } = require('../models/index');

const dao = {
  // 기계 데이터 등록
  insert(params) {
    return new Promise((resolve, reject) => {
      Device.create(params).then((inserted) => {
        resolve(inserted);
      }).catch((err) => {
        reject(err);
      });
    });
  },
};

module.exports = dao;
