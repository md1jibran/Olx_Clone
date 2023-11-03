const express = require("express");
const {
  allSoldProducts,
  allBoughtProducts,
  addtoBuyCart,
} = require("../controllers/cartController");
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();
router.route("/sold").get(protect, allSoldProducts);
router.get("/buy", protect, allBoughtProducts);
router.put("/buy", protect, addtoBuyCart);

module.exports = router;
