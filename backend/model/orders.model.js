import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    customerName: {
      type: String,
      required: true,
    },
    items: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Item",
      },
    ],
    totalCost: {
      type: Number,
      required: true,
    },
  },

  { timestamps: true }
);
export const Order = mongoose.model("Order", orderSchema);
