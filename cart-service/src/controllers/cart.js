const axios = require("axios");
const Cart = require("../models/Cart");
const Product = require("../models/Product");

const that = {};

that.validateProductId = async (productId, token) => {
  try {
    const config = {
      headers: {
        Authorization: token,
      },
    };
    const url = process.env.PRODUCT_BASE_URL + "/api/product/" + productId;
    await axios.get(url, config);

    return true;
  } catch (error) {
    return false;
  }
};

that.getByUserId = async (userId) => {
  try {
    let cartItems = await Cart.find({ userId }).populate({
      path: "product",
      model: "product",
    });
    return cartItems;
  } catch (error) {
    throw error;
  }
};

that.updateCart = async (userId, productId, quantity) => {
  try {
    let cartItem = await Cart.findOne({ userId, product: productId });

    if (!cartItem) {
      cartItem = new Cart({
        userId,
        product: productId,
        quantity,
      });
    } else {
      cartItem.quantity = quantity;
    }

    if (quantity === 0) {
      await Cart.findOneAndDelete({ userId, product: productId });
    } else {
      await cartItem.save();
    }
  } catch (error) {
    throw error;
  }
};

that.deleteByProductId = async (productId) => {
  try {
    await Cart.deleteMany({ product: productId });
  } catch (error) {
    throw error;
  }
};

module.exports = that;
