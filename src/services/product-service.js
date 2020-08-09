const { delilahSql } = require('../../database/database');

const getProductAll = async () => {
  return await delilahSql.query(`SELECT * FROM product`, {
    type: delilahSql.QueryTypes.SELECT,
  });
};

module.exports = {
  getProductAll,
};
