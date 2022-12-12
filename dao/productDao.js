const { Product } = require('../models/index');

const dao = {
  // 생산품 조회
  selectProduct(params) {
    return new Promise((resolve, reject) => {
      Product.findOne({
        where: { id: params.id },
      }).then((selectedOne) => {
        resolve(selectedOne);
      }).catch((err) => {
        reject(err);
      });
    });
  },
};

module.exports = dao;
