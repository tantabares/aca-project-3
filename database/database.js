const { Sequelize } = require('sequelize');
const config = require('./../config/config');
const dbConfig = global.config.database;

const delilahSql = new Sequelize(
  dbConfig.schema,
  dbConfig.user,
  dbConfig.password,
  {
    host: dbConfig.host,
    dialect: dbConfig.dialect,
    dialectOptions: {
      multipleStatements: true,
    },
    operatorsAliases: 0,
  }
);

const init = () => {
  delilahSql.sync({ force: false }).then(() => {
    console.log(`Succesful database conection: ${dbConfig.schema}`);
  });
};

module.exports = {
  delilahSql,
  init,
};
