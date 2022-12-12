const { Product } = require('../models/index');

const dao = {
  // 생산품 조회
  insert(params) {
    return new Promise((resolve, reject) => {
      Product.create(params).then((inserted) => {
        resolve(inserted);
      }).catch((err) => {
        reject(err);
      });
    });
  },

  //생산품 내역 업데이트
  update(params) {
    return new Promise((resolve, reject) => {
      Product.update(
        params,
        {
          where: { id: params.id },
        },
      ).then(([updated]) => {
        resolve({ updatedCount: updated });
      }).catch((err) => {
        reject(err);
      });
    });
  },

  //현재 생산품 id 조회
  currentIdInfo(params) {
    return new Promise((resolve, reject) => {
      Product.count(
        params,
      ).then((currentIdInfo) => {
        resolve(currentIdInfo);
      }).catch((err) => {
        reject(err);
      });
    });
  },
};

module.exports = dao;
