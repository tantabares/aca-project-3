const service = require('../services/product-service');

const getProductAll = async (req, res) => {
  try {
    const productsRaw = await service.getProductAll();
    return res.status(200).json(productsRaw);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};

module.exports = {
  getProductAll
}