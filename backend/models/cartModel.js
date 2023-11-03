const mongoose = require("mongoose");
const { productSchema } = require("./productModel");

const cartSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    cart: [{ product: productSchema }],
  },
  {
    timestamps: false,
  }
);

const Cart = mongoose.model("Cart", cartSchema);

module.exports.Cart = Cart;
