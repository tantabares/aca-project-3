const express = require('express');
const product = require('./controllers/product-controller');

const delilahApi = () => {
  const router = express.Router();

  router.get('/products', product.getProductAll);

  return router;
};

module.exports = {
  delilahApi,
};
