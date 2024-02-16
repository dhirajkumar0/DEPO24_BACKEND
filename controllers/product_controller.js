const Product = require("../models/product");

const addProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(200).json({ message: "product added successfully!!", product });
  } catch (err) {
    console.log(err, "Error");
    return;
  }
};

const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json({ message: "Product List", products });
  } catch (err) {
    console.log(err, "Error");
  }
};

module.exports = {
  addProduct,
  getProducts,
};
