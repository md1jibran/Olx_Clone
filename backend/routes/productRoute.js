const express = require("express");
const {
  getProducts,
  addProduct,
  getProductId,
} = require("../controllers/productController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", getProducts);
router.post("/", protect, addProduct);
router.get("/:productId", getProductId);

module.exports = router;
