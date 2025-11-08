import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    items: [
      {
        product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
        name: String,
        price: Number,
        quantity: Number,
      },
    ],
    totalAmount: Number,
    receipt: {
      receiptId: String,
      timestamp: Date,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);
