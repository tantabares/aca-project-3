const { delilahSql } = require('../../database/database');

const getOrderAll = async () => {
  return await delilahSql.query(
    `SELECT request.id, payment_method, status, 
        GROUP_CONCAT(product.id) AS product_ids,
        GROUP_CONCAT(product.name) AS product_names,
        GROUP_CONCAT(request_product.amount) AS product_amounts,
        GROUP_CONCAT(product.price) AS product_prices,
        SUM(request_product.amount * product.price) AS total,
        username
      FROM request
      JOIN request_product ON request.id = request_product.request_id
      JOIN product ON request_product.product_id = product.id
      JOIN user ON request.user_id = user.id
      WHERE request.del_flag != 1
      GROUP BY request.id`,
    {
      type: delilahSql.QueryTypes.SELECT,
    }
  );
};

const getOrder = async (id) => {
  return await delilahSql.query(
    `SELECT *
      FROM request
      WHERE del_flag != 1
      AND id = ${id}`,
    {
      type: delilahSql.QueryTypes.SELECT,
    }
  );
};

const getOrderSelf = async (id) => {
  return await delilahSql.query(
    `SELECT request.id, payment_method, status, 
        GROUP_CONCAT(product.id) AS product_ids,
        GROUP_CONCAT(product.name) AS product_names,
        GROUP_CONCAT(request_product.amount) AS product_amounts,
        GROUP_CONCAT(product.price) AS product_prices,
        SUM(request_product.amount * product.price) AS total,
        username
      FROM request
      JOIN request_product ON request.id = request_product.request_id
      JOIN product ON request_product.product_id = product.id
      JOIN user ON request.user_id = user.id
      WHERE request.del_flag != 1
      AND user.id = ${id}
      GROUP BY request.id`,
    {
      type: delilahSql.QueryTypes.SELECT,
    }
  );
};

const createOrder = async (user_id, method, products) => {
  const requestCreation = await delilahSql.query(
    `INSERT INTO request (user_id, payment_method)
      VALUES ('${user_id}', '${method}')`,
    {
      type: delilahSql.QueryTypes.INSERT,
    }
  );

  const requestId = requestCreation[0];

  products.forEach(async (item) => {
    await delilahSql.query(
      `INSERT INTO request_product (request_id, product_id, amount)
        VALUES ('${requestId}', '${item.id}', '${item.amount}')`,
      {
        type: delilahSql.QueryTypes.INSERT,
      }
    );
  });
};

const updateOrder = async (id, status) => {
  return await delilahSql.query(
    `UPDATE request
      SET status = '${status}'
      WHERE del_flag != 1
      AND id = ${id}`,
    {
      type: delilahSql.QueryTypes.UPDATE,
    }
  );
};

const deleteOrder = async (id) => {
  return await delilahSql.query(
    `UPDATE request
      SET del_flag = 1
      WHERE id = ${id}`,
    {
      type: delilahSql.QueryTypes.UPDATE,
    }
  );
}

module.exports = {
  getOrderAll,
  getOrderSelf,
  getOrder,
  createOrder,
  updateOrder,
  deleteOrder,
};
