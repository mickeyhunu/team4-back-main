// const logger = require('../lib/logger');
const productDao = require('../dao/productDao');
const service = {
  // 데이터 가공 후 전송
  async reg(params) {
    let inserted = null;
    pid = await productDao.currentIdInfo(params)
    pid += 1

    console.log(params.deviceId+'번 machine '+pid+'번째 출고')

    try {
      const _params = {
        deviceId: params.deviceId,
        productId: pid,
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
    pid = await productDao.currentIdInfo(params)
    console.log(params.deviceId+'번 machine '+pid+'번 '+params.color)
    try {
      const _params = {
        deviceId: params.deviceId,
        productId: pid,
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
    console.log(params.deviceId+'번 machine '+pid+'번 '+'주사위 : '+params.dice+'양품여부 : '+params.fair)
    try {
      pid = await productDao.currentIdInfo(params)
      const _params = {
        deviceId: params.deviceId,
        productId: pid,
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
      result = await productDao.currentIdInfo(params);
      console.log(result)
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
