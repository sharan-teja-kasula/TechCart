const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Types.ObjectId,
      required: true,
    },
    product: {
      type: mongoose.Types.ObjectId,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
  },
  { strict: false, timestamps: true },
  { collection: "cart" }
);

cartSchema.index({ userId: 1, product: 1 }, { unique: true });

const Cart = mongoose.model("cart", cartSchema);
module.exports = Cart;
