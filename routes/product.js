const express = require('express');

const router = express.Router();
const logger = require('../lib/logger');
const productService = require('../service/productService');
const { isLoggedIn } = require('../lib/middleware');

// 생산품 조회
router.get('/mqtt1/:id', isLoggedIn, /*mqtt_connect_1.connecting,*/ async (req, res) => {
  try {
    const params = {
      id: req.params.id,
      product: req.params.product,
      goods: req.params.goods,
    };
    logger.info(`(user.info.params) ${JSON.stringify(params)}`);

    const result = await productService.info(params);
    logger.info(`(user.info.result) ${JSON.stringify(result)}`);

    // 최종 응답
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ err: err.toString() });
  }
});

router.get('/mqtt2/:id',isLoggedIn, /*mqtt_connect_2.connecting,*/  async (req, res) => {
  try {
    const params = {
      id: req.params.id,
      product: req.params.product,
      goods: req.params.goods,
    };
    logger.info(`(user.info.params) ${JSON.stringify(params)}`);

    const result = await productService.info(params);
    logger.info(`(user.info.result) ${JSON.stringify(result)}`);

    // 최종 응답
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ err: err.toString() });
  }
});

module.exports = router;
