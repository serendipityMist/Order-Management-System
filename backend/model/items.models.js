import mongoose from "mongoose";

const itemSchea = new mongoose.Schema(
  {
    itemName: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

export const Item = mongoose.model("Item", itemSchea);
