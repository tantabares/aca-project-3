const { delilahSql } = require('../../database/database');

const getUserAll = async () => {
  return await delilahSql.query(
    `SELECT * 
      FROM user
      WHERE del_flag != 1`,
    {
      type: delilahSql.QueryTypes.SELECT,
    }
  );
};

const getUserSelf = async (id) => {
  return await delilahSql.query(
    `SELECT *
      FROM user
      WHERE del_flag != 1
      AND id = ${id}`,
    {
      type: delilahSql.QueryTypes.SELECT,
    }
  );
};

const getUser = async (username, password) => {
  return await delilahSql.query(
    `SELECT * FROM user
      WHERE del_flag != 1
      AND username = '${username}'
      AND password = '${password}'`,
    {
      type: delilahSql.QueryTypes.SELECT,
    }
  );
};

const createUser = async (
  username,
  fullname,
  email,
  password,
  phone,
  address
) => {
  return await delilahSql.query(
    `INSERT INTO user (username, fullname, email, password, phone, address)
      VALUES ("${username}", "${fullname}", "${email}", "${password}", "${phone}", "${address}");`,
    {
      type: delilahSql.QueryTypes.INSERT,
    }
  );
};

module.exports = {
  getUserAll,
  getUserSelf,
  getUser,
  createUser,
};
