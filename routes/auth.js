const express = require('express');

const router = express.Router();
const logger = require('../lib/logger');
const tokenUtil = require('../lib/tokenUtil');
// const middleware = require('../lib/middleware');
const userService = require('../service/userService');
// const { dupcheck } = require('../lib/middleware');

//1. 로그인 (user 토큰 발행)
router.post('/token', async (req, res) => {
  try {
    const params = {
      userid: req.body.userid,
      password: req.body.password,
    };
    logger.info(`(auth.token.params) ${JSON.stringify(params)}`);

    // 입력값 null 체크
    if (!params.userid || !params.password) {
      const err = new Error('Not allowed null (userid, password)');
      logger.error(err.toString());

      res.status(500).json({ err: err.toString() });
    }

    // 비즈니스 로직 호출
    const result = await userService.login(params);
    logger.info(`(auth.token.result) ${JSON.stringify(result)}`);

    // 토큰 생성
    const token = tokenUtil.makeToken(result);
    res.set('token', token); // header 세팅

    // 최종 응답
    res.status(200).json(
      {
        token: 'success',
        token: token
      });
  } catch (err) {
    res.status(500).json({ err: err.toString() });
  }
});

//2. 회원가입
router.post('/signup', async (req, res) => {
  try {
    const params = {
      // departmentId: req.body.departmentId,
      name: req.body.name,
      userid: req.body.userid,
      password: req.body.password,
      role: req.body.role,
      email: req.body.email,
      phone: req.body.phone,
    };
    logger.info(`(user.reg.params) ${JSON.stringify(params)}`);

    // 입력값 null 체크
    if (!params.name || !params.userid || !params.password) {
      const err = new Error('Not allowed null (name, userid, password)');
      logger.error(err.toString());

      res.status(500).json({ err: err.toString() });
    }
    // test 아이디에 대해 admin 권한 부여
    params.role = params.userid == "test" && params.password == "test" ? 'admin' : params.role;

    // 비즈니스 로직 호출
    const result = await userService.reg(params);
    logger.info(`(user.reg.result) ${JSON.stringify(result)}`);

    // 최종 응답
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ err: err.toString() });
  }
});


module.exports = router;
