const axios = require("axios");
const Product = require("../models/Product");

const that = {};

that.getAll = async () => {
  try {
    const products = await Product.find({});
    return products;
  } catch (err) {
    throw err;
  }
};

that.getById = async (productId) => {
  try {
    const product = await Product.findById(productId);
    return product && product._doc;
  } catch (err) {
    throw err;
  }
};

that.deleteById = async (productId) => {
  try {
    const product = await Product.deleteOne({ _id: productId });
    return product;
  } catch (err) {
    throw err;
  }
};

that.createProduct = async (productData) => {
  try {
    const product = new Product(productData);
    await product.save();
    return product;
  } catch (err) {
    throw err;
  }
};

that.updateProduct = async (productId, productData) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      { $set: productData },
      { new: true }
    );

    return updatedProduct;
  } catch (err) {
    throw err;
  }
};

that.deleteFromCarts = async (productId, token) => {
  try {
    const config = {
      headers: {
        Authorization: token,
      },
      method: "DELETE",
    };

    const url = process.env.CART_BASE_URL + "/api/cart/" + productId;
    await axios.delete(url, config);

    return true;
  } catch (error) {
    return false;
  }
};

module.exports = that;
