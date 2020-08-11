const express = require('express');
const parser = require('body-parser');
const { delilahApi } = require('./endpoints');

process.env.NODE_ENV = 'development';

const config = require('./../config/config');

const server = express();

server.use(parser.json());

server.get('/test', (req, res) => {
  return res
    .status(200)
    .json({ message: 'connection ok', data: {} });
});

server.use('/api/delilah', delilahApi());

server.listen(global.config.node_port, () => {
  console.log(`Server started, port: ${global.config.node_port}`);
});
