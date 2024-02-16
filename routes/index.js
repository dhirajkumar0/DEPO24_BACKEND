const express = require("express");
const router = express.Router();
const {
  addProduct,
  getProducts,
} = require("../controllers/product_controller");
const { addOrder, getOrders } = require("../controllers/order_controller");

console.log("router loaded");

router.get("/", (req, res) => {
  res.status(200).json({ message: "Welcome to Depo-24-api" });
});
router.post("/add-product", addProduct);
router.get("/get-products", getProducts);
router.post("/add-order", addOrder);
router.get("/get-order", getOrders);

module.exports = router;
