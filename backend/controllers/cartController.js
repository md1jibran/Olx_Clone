const asyncHandler = require("express-async-handler");
const { Cart } = require("../models/cartModel");
const { Product } = require("../models/productModel");

const allSoldProducts = asyncHandler(async (req, res) => {
  try {
    sellCart = await Product.find({ seller: req.user.email });
    if (!!sellCart) {
      res.send(sellCart);
    } else {
      res.status(404);
      throw new Error("Cart not found!");
    }
  } catch (error) {
    throw new Error("Internal Error Found!");
  }
});

const allBoughtProducts = asyncHandler(async (req, res) => {
  console.log(req.user.email);
  buyCart = await Cart.findOne({ email: req.user.email });
  // console.log(buy)
  console.log(buyCart.cart);
  res.send(buyCart.cart);
});

const addtoBuyCart = asyncHandler(async (req, res) => {
  const user = req.user;
  const id = req.body.productId;
  try {
    usrscart = await Cart.findOne({ email: user.email });
  } catch (error) {
    res.status(500);
    throw new Error("INTERNAL_SERVER_ERROR");
  }
  if (!usrscart) {
    usrscart = await Cart.create({ email: user.email });
  }

  let product = await Product.findById(id);
  if (!product) {
    res.status(404);
    throw new Error("Product doesn't exist in database");
  } else {
    try {
      product.sold = true;
      // product.save();
      product.save(function (err, result) {
        if (err) {
          res.status(500);
          throw new Error("INTERNAL_SERVER_ERROR");
        } else {
          console.log(result);
          usrscart.cart.push({ product: result });
          usrscart.save(function (err, result) {
            if (err) {
              res.status(500);
              throw new Error("INTERNAL_SERVER_ERROR");
            } else {
              console.log(result);
              res.send(result);
            }
          });
        }
      });
    } catch (error) {
      res.status(500);
      throw new Error("INTERNAL_SERVER_ERROR");
    }
  }
});

module.exports = { allSoldProducts, allBoughtProducts, addtoBuyCart };
