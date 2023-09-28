const express = require("express");

const router = express.Router();

const cartController = require("../controllers/cart");

const { logError } = require("../services/logger");

router.post("/", async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    const userId = req.user._id;
    const token = req.token;

    const isValidProductId = await cartController.validateProductId(
      productId,
      token
    );

    if (!isValidProductId)
      return res.status(422).send({ msg: "Invalid ProductId!" });

    await cartController.updateCart(userId, productId, quantity);

    if (quantity > 0) {
      return res.status(200).send({ msg: "Product added in cart!" });
    }
    res.status(200).send({ msg: "Product removed from cart!" });
  } catch (err) {
    logError("product.js", "/", "POST", req, err);
    res.status(500).send({ msg: "Something went wrong!" });
  }
});

router.get("/", async (req, res) => {
  try {
    const userId = req.user._id;
    const cartItems = await cartController.getByUserId(userId);

    res.status(200).send({ cartItems });
  } catch (err) {
    logError("product.js", "/", "GET", req, err);
    res.status(500).send({ msg: "Something went wrong!" });
  }
});

router.delete("/:productId", async (req, res) => {
  try {
    const { productId } = req.params;

    await cartController.deleteByProductId(productId);

    res.status(200).send({ msg: "Product removed from carts!" });
  } catch (err) {
    logError("product.js", "/", "GET", req, err);
    res.status(500).send({ msg: "Something went wrong!" });
  }
});

module.exports = router;
