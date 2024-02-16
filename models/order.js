const mongoose = require("mongoose");

// schema for storing the order details
const orderSchema = new mongoose.Schema(
  {
    sub_total: {
      type: Number,
    },
    total: {
      type: Number,
    },
    cGst: {
      type: Number,
    },
    sGst: {
      type: Number,
    },

    products: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
        },
        qty: {
          type: Number,
        },
        amount: {
          type: Number,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
