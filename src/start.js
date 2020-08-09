const express = require('express');
const parser = require('body-parser');
const { config } = require('./config');

const server = express();

server.use(parser.json());

server.listen(config.server.port, () => {
  console.log(`Server started, port: ${config.server.port}`);
});
