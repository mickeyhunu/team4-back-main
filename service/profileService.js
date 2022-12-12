const logger = require('../lib/logger');
const hashUtil = require('../lib/hashUtil');
const profileDao = require('../dao/profileDao');

const service = {
  // selectInfo
  async info(params) {
    let result = null;

    try {
      result = await profileDao.selectInfo(params);
      logger.debug(`(userService.info) ${JSON.stringify(result)}`);
    } catch (err) {
      logger.error(`(userService.info) ${err.toString()}`);
      return new Promise((resolve, reject) => {
        reject(err);
      });
    }

    return new Promise((resolve) => {
      resolve(result);
    });
  },
  // update
  async edit(params) {
    let result = null;
    let inserted = params.password;

    // 비밀번호 암호화
    if(params.password != null) {
      let hashPassword = null;
      try {
        hashPassword = await hashUtil.makePasswordHash(inserted);
        logger.debug(`(userService.makePassword) ${JSON.stringify(inserted)}`);
      } catch (err) {
        logger.error(`(userService.makePassword) ${err.toString()}`);
        return new Promise((resolve, reject) => {
          reject(err);
        });
      }
      const newParams = {
        ...params,
        password: hashPassword,
      };

      try {
        result = await profileDao.update(newParams);
        logger.debug(`(userService.edit) ${JSON.stringify(result)}`);
      } catch (err) {
        logger.error(`(userService.edit) ${err.toString()}`);
        return new Promise((resolve, reject) => {
          reject(err);
        });
      }

      return new Promise((resolve) => {
        resolve(result);
      });
    } else {
      // 비밀번호 외 다른 항목만 수정할때
      try {
        result = await profileDao.update(params);
        logger.debug(`(userService.edit) ${JSON.stringify(result)}`);
      } catch (err) {
        logger.error(`(userService.edit) ${err.toString()}`);
        return new Promise((resolve, reject) => {
          reject(err);
        });
      }

      return new Promise((resolve) => {
        resolve(result);
      });
    }
  },
};

module.exports = service;
