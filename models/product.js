const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    dsin: {
      type: String,
    },
    name: {
      type: String,
    },
    mrp: {
      type: Number,
    },
    hsn: {
      type: String,
    },
    gst: {
      type: String,
    },
    discount: {
      type: String,
    },
    unit: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
