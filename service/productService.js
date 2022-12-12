const logger = require('../lib/logger');
const productDao = require('../dao/productDao');

const service = {
  // selectInfo
  async info(params) {
    let result = null;
    if (params.Device.No3Gripper) {
      
    }
    try {
      result = await productDao.selectProduct(params);
      logger.debug(`(productService.info) ${JSON.stringify(result)}`);
    } catch (err) {
      logger.error(`(productService.info) ${err.toString()}`);
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
