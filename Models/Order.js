import { Timestamp } from "mongodb";
import mongoose from "mongoose";

const { ObjectId } = mongoose.Schema;
const orderSchema = new mongoose.Schema(
  {
    orderId: {
      type: String,
    },
    priority: {
      type: Boolean,
    },
    cart: {
      type: Array,
    },
    address: {
      type: String,
    },
    customer: {
      type: String,
    },
    phone: {
      type: String,
    },
    creator: {
      type: ObjectId,
      ref: "user",
    },
  },
  Timestamp
);

export const Order = mongoose.model("Order", orderSchema);
