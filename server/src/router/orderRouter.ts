import express from "express";
import {
  allOrders,
  placeOrder,
  updateStatus,
  userORders,
} from "../controllers/orderControllers";
import { adminAUth } from "../middlewares/adminAuth";
import authUser from "../middlewares/auth";

const orderRouter = express.Router();

//admin features
orderRouter.post("/list", adminAUth, allOrders);
orderRouter.post("/status", adminAUth, updateStatus);

//payment features

orderRouter.post("/place", authUser, placeOrder);

//user features
orderRouter.post("/userorders", authUser, userORders);

export default orderRouter;
