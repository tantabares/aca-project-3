const service = require('../services/order-service');

const getOrderAll = async (req, res) => {
  try {
    const ordersRaw = await service.getOrderAll();

    if (ordersRaw) {
      const data =
        ordersRaw.length > 0 ? (transformed = transform(ordersRaw)) : ordersRaw;
      return res.status(200).json({ message: 'ok', data: data });
    }

    return res.status(404).json({ message: 'not-found' });
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};

const getOrderSelf = async (req, res) => {
  try {
    const id = res.decoded.id;
    console.log(res.decoded);

    if (!id) {
      return res.status(400).json({ message: 'invalid' });
    }

    const ordersRaw = await service.getOrderSelf(id);

    if (ordersRaw) {
      const data =
        ordersRaw.length > 0 ? (transformed = transform(ordersRaw)) : ordersRaw;
      return res.status(200).json({ message: 'ok', data: data });
    }

    return res.status(404).json({ message: 'not-found' });
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};

const createOrder = async (req, res) => {
  try {
    const user_id = res.decoded.id;

    if (!user_id) {
      return res.status(400).json({ message: 'invalid' });
    }

    const { payment_method, items } = req.body;

    const valid = validateValues(payment_method, items);

    if (!valid.valid) {
      return res.status(400).json({ message: `bad request: ${valid.message}` });
    }

    await service.createOrder(user_id, payment_method, items);

    return res.status(201).json({ message: `order created` });
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};

const updateOrder = async (req, res) => {
  const statuses = [
    'cancelled',
    'confirmed',
    'delivered',
    'in_prep',
    'new',
    'sent',
  ];
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(400).json({ message: 'bad-request: no id provided' });
    }

    const requestRaw = await service.getOrder(id);
    if (requestRaw.length !== 1) {
      return res.status(404).json({ message: `Order with id ${id} not found` });
    }

    const { status } = req.body;

    if (!status || status === '') {
      return res.status(400).json({ message: 'new status not provided' });
    } else {
      if (!statuses.includes(status)) {
        return res.status(400).json({
          message: 'new status must be one of these: ' + statuses.toString(),
        });
      }
    }

    await service.updateOrder(id, status);

    return res
      .status(201)
      .json({ message: `order ${id} updated with new status: ${status}` });
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};

const transform = (data) => {
  data.forEach((item) => {
    item.items = [];
    const ids = item.product_ids.split(',');
    const names = item.product_names.split(',');
    const amounts = item.product_amounts.split(',');
    const prices = item.product_prices.split(',');

    for (i = 0; i < ids.length; i++) {
      item.items.push({
        id: ids[i],
        amount: amounts[i],
        name: names[i],
        price: prices[i],
      });
    }

    delete item.product_ids;
    delete item.product_names;
    delete item.product_amounts;
    delete item.product_prices;
  });

  return data;
};

const validateValues = (payment_method, products) => {
  if (
    !payment_method ||
    payment_method === '' ||
    (payment_method !== 'card' && payment_method !== 'cash')
  )
    return {
      valid: false,
      message: 'payment method must be cash or card',
    };

  if (!products || products.length < 1)
    return {
      valid: false,
      message: 'no product provided',
    };
  else {
    products.forEach((item) => {
      if (!item.id || !item.amount)
        return {
          valid: false,
          message: 'at least an item has issues',
        };
    });
  }

  return {
    valid: true,
    message: 'ok',
  };
};

module.exports = {
  getOrderAll,
  getOrderSelf,
  createOrder,
  updateOrder,
};
