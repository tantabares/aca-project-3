const express = require('express');
const auth = require('./auth');
const product = require('./controllers/product-controller');
const user = require('./controllers/user-controller');
const order = require('./controllers/order-controller');

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
  router.get(
    '/orders',
    auth.validateToken,
    auth.validateAdmin,
    order.getOrderAll
  );
  router.get('/myorders', auth.validateToken, order.getOrderSelf);
  router.post('/orders', auth.validateToken, order.createOrder);
  router.put(
    '/orders/:id',
    auth.validateToken,
    auth.validateAdmin,
    order.updateOrder
  );

  return router;
};

module.exports = {
  delilahApi,
};
