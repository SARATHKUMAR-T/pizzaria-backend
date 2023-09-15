import express from "express";
import jwt from "jsonwebtoken";
import "dotenv/config";
import { Order } from "../Models/Order.js";
import { isAuthenticated } from "../auth.js";

export const orderRouter = express.Router();

orderRouter.post("/addorder", isAuthenticated, async (req, res) => {
  try {
    const order = req.body;
    console.log(order);
    await new Order({ ...order, creator: req.user._id }).save();
    res.status(200).json({ message: "Your Order Is Taken!" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "internal server error" });
  }
});

orderRouter.get("/getorders", isAuthenticated, async (req, res) => {
  try {
    const orders = await Order.find({ creator: req.user._id });
    if (orders) {
      res.status(200).json({ orders, message: "Orders fetched successfully" });
    } else {
      res.status(400).json({ message: "Unable to fetch Orders" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "internal server error" });
  }
});
orderRouter.delete("/order/delete/:id", isAuthenticated, async (req, res) => {
  try {
    const deleteStreak = await Order.findByIdAndDelete({ _id: req.params.id });
    if (!deleteStreak) {
      res;
      res.status(400).json({ message: "error occured" });
      return;
    } else {
      res.status(200).json({ message: "Order Deleted Successfully!" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "internal server error" });
  }
});

// orderRouter.patch("/orders/start/:id", isAuthenticated, async (req, res) => {
//   try {
//     // const startdate = new Date().toLocaleString();

//     // const options = {
//     //   year: "numeric",
//     //   month: "numeric",
//     //   day: "numeric",
//     //   hour: "numeric",
//     //   minute: "numeric",
//     //   second: "numeric",
//     //   timeZoneName: "short",
//     //   hour12: false,
//     // };

//     // const formatter = new Intl.DateTimeFormat("en-US", options);
//     // const formattedDate = formatter.format(new Date());

//     const order = await Order.findByIdAndUpdate(
//       { _id: req.params.id },
//       { $set: { isstarted: true, startdate: req.body.startdate } },
//       { new: true }
//     );
//     if (order) {
//       res.status(200).json({ order, message: "Order Started successfully" });
//     } else {
//       res.status(400).json({ message: "Unable to start the order" });
//     }
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "internal server error" });
//   }
// });
