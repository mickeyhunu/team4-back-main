// const logger = require('../lib/logger');
const productDao = require('../dao/productDao');
const service = {
  // 데이터 가공 후 전송
  async reg(params) {
    let inserted = null;
    try {
      const _params = {
        deviceId: params.deviceId,
        productId: params.productId,
        fair : params.fair,
        dice : params.dice,
        color : params.color,
      }

      inserted = await productDao.insert(_params);

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

  async edit_color(params) {
    let inserted = null;
    try {
      const _params = {
        id: await productDao.currentIdInfo(params.deviceId),
        color: params.color,
      }
      inserted = await productDao.update(_params);
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

  async edit_dice(params) {
    let inserted = null;
    try {
      const _params = {
        id: await productDao.currentIdInfo(params.deviceId),
        productId: params.productId,
        dice: params.dice,
        fair: params.fair
      }
      inserted = await productDao.update(_params);
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

  async currentidinfo(params) {
    let result = null;
    try {
      result = await productDao.currentIdInfo(params.deviceId);
    } catch (err) {
      return new Promise((resolve, reject) => {
        reject(err);
      });
    }
    return new Promise((resolve) => {
      resolve(result);
    });
  },
};



module.exports = service;
