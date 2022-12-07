const { User } = require('../models');
// const { findOne } = require('../models/department');
const logger = require('./logger');
const tokenUtil = require('./tokenUtil');

const middleware = {
  // 로그인 체크
  isLoggedIn(req, res, next) {
    const token = req.headers && req.headers.token;

    if (token) {
      // 토큰이 있는 경우 토큰 검증을 수행 한다.
      const decoded = tokenUtil.verifyToken(token);

      if (decoded) {
        // 1. 토큰 검증이 성공한 경우 새로 갱신해 준다.
        const newToken = tokenUtil.makeToken(decoded);
        res.set('token', newToken); // header 세팅

        next(); // 미들웨어 통과(계속 진행)
      } else {
        // 2. 토큰 검증이 실패한 경우 401에러를 응답 한다.
        const err = new Error('Unauthorized token');
        logger.error(err.toString());

        res.status(401).json({ err: err.toString() });
      }
    } else {
      // 토큰이 없는 경우 401에러 응답
      const err = new Error('Unauthorized token');
      logger.error(err.toString());

      res.status(401).json({ err: err.toString() });
    }
  },

  //권한 체크
  async authentication (req, res, next) {
    try {
      const auth = await User.findOne({ role: req.decoded.role });
      if (!(auth == 'admin' && auth == 'leader')) {
        const err = new Error('Unauthorized');
        logger.error(err.toString());

        res.status(401).json({ err: err.toString() });
      } else {
        next();
      }
    }
    catch (error) {
      const err = new Error('Unauthorized');
        logger.error(err.toString());

        res.status(401).json({ err: err.toString() });
    }
  }
};

module.exports = middleware;
