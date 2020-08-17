const service = require('../services/user-service');
const jwt = require('jsonwebtoken');
const config = require('./../../config/config');
const jwtConfig = global.config.jwt;

const getUserAll = async (req, res) => {
  try {
    const usersRaw = await service.getUserAll();

    if (usersRaw) {
      return res.status(200).json({ message: 'ok', data: usersRaw });
    }

    return res.status(404).json({ message: 'not-found' });
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};

const getUserSelf = async (req, res) => {
  try {
    const id = res.decoded.id;
    console.log(res.decoded);

    if (!id) {
      return res.status(400).json({ message: 'invalid' });
    }

    const userRaw = await service.getUserSelf(id);

    if (userRaw) {
      return res.status(200).json({ message: 'ok', data: userRaw });
    }

    return res.status(404).json({ message: 'not-found' });
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};

const logInUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const valid = validateLogIn(username, password);

    if (!valid.valid) {
      return res.status(400).json({ message: `bad request: ${valid.message}` });
    }

    const userRaw = await service.getUser(username, password);

    if (userRaw) {
      if (userRaw.length !== 1) {
        return res.status(404).json({ message: 'invalid login' });
      } else {
        const payload = {
          id: userRaw[0].id,
          isadmin: userRaw[0].admin,
        };

        const token = jwt.sign(payload, jwtConfig.key, {
          expiresIn: jwtConfig.expires,
        });

        return res.status(200).json({
          message: 'ok - logged in',
          data: { token_type: 'bearer', token: token },
        });
      }
    }

    return res.status(404).json({ message: 'not-found' });
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};

const createUser = async (req, res) => {
  try {
    const { username, fullname, email, password, phone, address } = req.body;

    const valid = validateValues(
      username,
      fullname,
      email,
      password,
      phone,
      address
    );

    if (!valid.valid) {
      return res.status(400).json({ message: `bad request: ${valid.message}` });
    }

    await service.createUser(
      username,
      fullname,
      email,
      password,
      phone,
      address
    );

    return res.status(201).json({ message: `user created: ${username}` });
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};

const validateValues = (username, fullname, email, password) => {
  if (!username || username === '')
    return {
      valid: false,
      message: 'no username provided',
    };

  if (!fullname || fullname === '')
    return {
      valid: false,
      message: 'no fullname provided',
    };

  if (!email || email === '')
    return {
      valid: false,
      message: 'no email provided',
    };

  if (!password || password === '')
    return {
      valid: false,
      message: 'no password provided',
    };

  return {
    valid: true,
    message: 'ok',
  };
};

const validateLogIn = (username, password) => {
  if (!username || username === '')
    return {
      valid: false,
      message: 'no username provided',
    };

  if (!password || password === '')
    return {
      valid: false,
      message: 'no password provided',
    };

  return {
    valid: true,
    message: 'ok',
  };
};

module.exports = {
  getUserAll,
  getUserSelf,
  logInUser,
  createUser,
};
