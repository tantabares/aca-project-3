const express = require('express');
const product = require('./controllers/product-controller');

const delilahApi = () => {
  const router = express.Router();

  // Product Endpoints
  router.get('/products', product.getProductAll);
  router.get('/products/:id', product.getProduct);
  router.post('/products', product.createProduct);
  router.put('/products/:id', product.updateProduct);
  router.delete('/products/:id', product.deleteProduct);

  return router;
};

module.exports = {
  delilahApi,
};
