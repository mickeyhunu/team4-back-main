const express = require('express');

const router = express.Router();
const logger = require('../lib/logger');
const profileService = require('../service/profileService');
const { isLoggedIn } = require('../lib/middleware');
const upload = require('../lib/photo');

// 자신 프로필 조회
router.get('/:id', isLoggedIn, async (req, res) => {
  try {
    const params = {
      id: req.params.id,
    };
    logger.info(`(user.info.params) ${JSON.stringify(params)}`);

    const result = await profileService.info(params);
    logger.info(`(user.info.result) ${JSON.stringify(result)}`);

    // 최종 응답
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ err: err.toString() });
  }
});

// 자신 프로필 수정
router.put('/:id', isLoggedIn, async (req, res) => {
  try {
    const params = {
      id: req.params.id,
      departmentId: req.body.departmentId ? req.body.departmentId : null,
      name: req.body.name,
      role: req.body.role,
      email: req.body.email,
      phone: req.body.phone
    };

    logger.info(`(user.update.params) ${JSON.stringify(params)}`);


    // 입력값 null 체크
    if (!params.name) {
      const err = new Error('Not allowed null (name)');
      logger.error(err.toString());

      return res.status(500).json({ err: err.toString() });
    }

    const result = await profileService.edit(params);
    logger.info(`(user.update.result) ${JSON.stringify(result)}`);
    // 최종 응답
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ err: err.toString() });
  }
});

// 프로필 사진 수정
router.put('/uploads/:id', isLoggedIn, upload.single('img'),   async (req, res) => {
  try {
    const params = {
      id: req.params.id,
      img: req.file ? req.file.filename : null
    };

    logger.info(`(user.update.params) ${JSON.stringify(params)}`);

    const result = await profileService.edit(params);
    logger.info(`(user.update.result) ${JSON.stringify(result)}`);
    // 최종 응답
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ err: err.toString() });
  }
});

module.exports = router;
