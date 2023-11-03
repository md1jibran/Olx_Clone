const mongoose = require("mongoose");
const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      lowecase: true,
    },
    price: {
      type: Number,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    sold: {
      type: Boolean,
      default: false,
    },
    category: {
      type: String,
      required: true,
      lowecase: true,
    },

    details: {
      type: String,
      required: true,
    },
    seller: {
      type: String,
      required: true,
    },
    sellerName: {
      type: String,
    },
    sellerPic: {
      type: String,
    },
    phone: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);
module.exports.Product = Product;
module.exports.productSchema = productSchema;
