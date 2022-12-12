// const logger = require('../lib/logger');
const mqttDao = require('../dao/mqttDao');

const service = {
  // 데이터 전송
  async reg(params) {
    let inserted = null;
    try {
      inserted = await mqttDao.insert(params);
    } catch (err) {
      return new Promise((resolve, reject) => {
        reject(err);
      });
    }

    // 결과값 리턴
    return new Promise((resolve) => {
      resolve(inserted);
    });
  },
};

module.exports = service;