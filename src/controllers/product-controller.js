const service = require('../services/product-service');

const getProductAll = async (req, res) => {
  try {
    const productsRaw = await service.getProductAll();
    if (productsRaw) {
      return res.status(200).json({ message: 'ok', data: productsRaw });
    }

    return res.status(404).json({ message: 'not-found' });
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};

const getProduct = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(400).json({ message: 'bad-request: no id provided' });
    }

    const productRaw = await service.getProduct(id);
    if (productRaw) {
      return res.status(200).json({ message: 'ok', data: productRaw });
    }

    return res.status(404).json({ message: 'not-found' });
  } catch (err) {
    return res.status(500).json(err);
  }
};

const createProduct = async (req, res) => {
  try {
    const { name, description, picture, price } = req.body;

    validateValues(res, name, description, picture, price);

    await service.createProduct(name, description, picture, price);

    return res.status(201).json({ message: `product created: ${name}` });
  } catch (err) {
    return res.status(500).json(err);
  }
};

const updateProduct = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(400).json({ message: 'bad-request: no id provided' });
    }

    const { name, description, picture, price } = req.body;

    validateValues(res, name, description, picture, price);

    await service.updateProduct(id, name, description, picture, price);

    return res.status(201).json({ message: `product updated: ${name}` });
  } catch (err) {
    return res.status(500).json(err);
  }
};

const deleteProduct = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(400).json({ message: 'bad-request: no id provided' });
    }

    await service.deleteProduct(id);

    return res.status(200).json({ message: `product with id ${id} deleted` });
  } catch (err) {
    return res.status(500).json(err);
  }
};

const validateValues = (res, name, description, picture, price) => {
  if (!name || name === '')
    return res.status(400).json({ message: 'bad-request: no name provided' });

  if (!description || description === '')
    return res
      .status(400)
      .json({ message: 'bad-request: no description provided' });

  if (!picture || picture === '')
    return res
      .status(400)
      .json({ message: 'bad-request: no picture provided' });

  if (!price || price === '')
    return res.status(400).json({ message: 'bad-request: no price provided' });
};

module.exports = {
  getProductAll,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};
