const jwt = require('jsonwebtoken');
const config = require('./../config/config');
const jwtConfig = global.config.jwt;

const validateToken = (req, res, next) => {
  const header = req.headers['authorization'];

  if (!header) {
    return res.status(401).json({ message: 'unauthorized' });
  }

  const token = header.split(' ')[1];
  jwt.verify(token, jwtConfig.key, (err, decoded) => {
    res.decoded = decoded;
    if (err) {
      console.log(err);
      return res.status(401).json({ message: 'expired or invalid token' });
    }
  });

  next();
};

const validateAdmin = (req, res, next) => {
  const token = req.headers['authorization'].split(' ')[1];
  const decoded = jwt.verify(token, jwtConfig.key);

  if (decoded.isadmin === 0) {
    return res.status(401).json({ message: 'unauthorized - not an admin' });
  }

  next();
};

module.exports = {
  validateToken,
  validateAdmin,
};
