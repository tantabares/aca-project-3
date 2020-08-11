const { delilahSql } = require('../../database/database');

const getProductAll = async () => {
  return await delilahSql.query(
    `SELECT * 
    FROM product
    WHERE del_flag != 1`,
    {
      type: delilahSql.QueryTypes.SELECT,
    }
  );
};

const getProduct = async (id) => {
  return await delilahSql.query(
    `SELECT * 
    FROM product 
    WHERE id = ${id}
    AND del_flag != 1`,
    {
      type: delilahSql.QueryTypes.SELECT,
    }
  );
};

const createProduct = async (name, description, picture, price) => {
  return await delilahSql.query(
    `INSERT INTO product (name, description, picture, price)
    VALUES ('${name}', '${description}', '${picture}' ,'${price}')`,
    {
      type: delilahSql.QueryTypes.INSERT,
    }
  );
};

const updateProduct = async (id, name, description, picture, price) => {
  return await delilahSql.query(
    `UPDATE product
    SET name = '${name}',
      description = '${description}',
      picture = '${picture}',
      price = '${price}'
    WHERE id = ${id}
    AND del_flag != 1`,
    {
      type: delilahSql.QueryTypes.UPDATE,
    }
  );
};

const deleteProduct = async (id) => {
  return await delilahSql.query(
    `UPDATE product
    SET del_flag = 1
    WHERE id = ${id};`,
    {
      type: delilahSql.QueryTypes.UPDATE,
    }
  );
};

module.exports = {
  getProductAll,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};
