const express = require("express");

const router = express.Router();

const productController = require("../controllers/product");

const { logError } = require("../services/logger");

router.post("/", async (req, res) => {
  try {
    if (!req.user.isAdmin) {
      return res.status(403).send({ msg: "Access denied!" });
    }

    const { name, description, price, quantity, imageUrl } = req.body;

    if (typeof name !== "string" || name?.length < 5)
      return res.status(422).send({ msg: "Product name minimum length is 5!" });

    if (typeof description !== "string" || description?.length < 50)
      return res.status(422).send({ msg: "Description minimum length is 50!" });

    if (typeof price !== "number" || price < 0)
      return res.status(422).send({ msg: "Price can't be negative!" });

    if (typeof quantity !== "number" || quantity < 0)
      return res.status(422).send({ msg: "Quantity can't be negative!" });

    if (typeof imageUrl !== "string" || imageUrl < 5)
      return res.status(422).send({ msg: "Invalid image url!" });

    const productData = {
      name,
      description,
      price,
      quantity,
      imageUrl,
    };

    const product = await productController.createProduct(productData);

    res.status(200).send({ product, msg: "Product added successfully!" });
  } catch (err) {
    logError("product.js", "/", "POST", req, err);
    res.status(500).send({ msg: "Something went wrong!" });
  }
});

router.put("/:productId", async (req, res) => {
  try {
    if (!req.user.isAdmin) {
      return res.status(403).send({ msg: "Access denied!" });
    }

    const { productId } = req.params;
    const { name, description, price, quantity, imageUrl } = req.body;

    if (typeof name !== "string" || name?.length < 5)
      return res.status(422).send({ msg: "Product name minimum length is 5!" });

    if (typeof description !== "string" || description?.length < 50)
      return res.status(422).send({ msg: "Description minimum length is 50!" });

    if (typeof price !== "number" || price < 0)
      return res.status(422).send({ msg: "Price can't be negative!" });

    if (typeof quantity !== "number" || quantity < 0)
      return res.status(422).send({ msg: "Quantity can't be negative!" });

    if (typeof imageUrl !== "string" || imageUrl < 5)
      return res.status(422).send({ msg: "Invalid image url!" });

    const productData = {
      name,
      description,
      price,
      quantity,
      imageUrl,
    };

    const product = await productController.updateProduct(
      productId,
      productData
    );

    if (!product)
      return res.status(422).send({ product, msg: "Product not found!" });

    res.status(200).send({ product, msg: "Product updated successfully!" });
  } catch (err) {
    logError("product.js", "/", "PUT", req, err);
    res.status(500).send({ msg: "Something went wrong!" });
  }
});

router.get("/", async (req, res) => {
  try {
    const products = await productController.getAll();

    res.status(200).send({ products });
  } catch (err) {
    logError("product.js", "/", "GET", req, err);
    res.status(500).send({ msg: "Something went wrong!" });
  }
});

router.get("/:productId", async (req, res) => {
  try {
    const { productId } = req.params;

    const product = await productController.getById(productId);

    if (!product) return res.status(422).send({ msg: "Product not found!" });

    res.status(200).send({ product });
  } catch (err) {
    logError("product.js", `/${req.params.productId}`, "GET", req, err);
    res.status(500).send({ msg: "Something went wrong!" });
  }
});

router.delete("/:productId", async (req, res) => {
  try {
    if (!req.user.isAdmin) {
      return res.status(403).send({ msg: "Access denied!" });
    }

    const { productId } = req.params;

    const token = req.token;

    const product = await productController.deleteById(productId);
    if (!product) return res.status(422).send({ msg: "Product not found!" });

    await productController.deleteFromCarts(productId, token);

    res.status(200).send({ msg: "Product deleted successfully!" });
  } catch (err) {
    logError("product.js", `/${req.params.productId}`, "GET", req, err);
    res.status(500).send({ msg: "Something went wrong!" });
  }
});

module.exports = router;
