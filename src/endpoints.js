const express = require('express');
const product = require('./controllers/product-controller');
const user = require('./controllers/user-controller');
const auth = require('./auth');

const delilahApi = () => {
  const router = express.Router();

  // Product Endpoints
  router.get('/products', product.getProductAll);
  router.get('/products/:id', product.getProduct);
  router.post(
    '/products',
    auth.validateToken,
    auth.validateAdmin,
    product.createProduct
  );
  router.put(
    '/products/:id',
    auth.validateToken,
    auth.validateAdmin,
    product.updateProduct
  );
  router.delete(
    '/products/:id',
    auth.validateToken,
    auth.validateAdmin,
    product.deleteProduct
  );

  // User Endpoints
  router.get('/users', auth.validateToken, auth.validateAdmin, user.getUserAll);
  router.get('/myuser', auth.validateToken, user.getUserSelf);
  router.post('/signup', user.createUser);
  router.post('/signin', user.logInUser);

  // Order Endpoints

  return router;
};

module.exports = {
  delilahApi,
};
