const Order = require("../models/order");

const addOrder = async (req, res) => {
  console.log(req.body);
  const order = await Order.create(req.body);
  res.status(200).json({ message: "Order added successfully!!", order });
};

const getOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json({ message: "Order List", orders });
  } catch (err) {
    console.log(err, "Error");
  }
};

module.exports = {
  addOrder,
  getOrders,
};
