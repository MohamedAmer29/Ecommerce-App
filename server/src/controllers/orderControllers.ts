import { Request, Response } from "express";
import Order from "../module/orderDb";
import User from "../module/useDb";

//Placing orders using COD method
export async function placeOrder(req: Request, res: Response) {
  try {
    const { userId, items, amount, address } = req.body;

    const orderData = {
      userId,
      items,
      amount,
      address,
      paymentMethod: "COD",
      payment: false,
      date: Date.now(),
    };

    const newOrder = new Order(orderData);
    await newOrder.save();

    await User.findByIdAndUpdate(userId, { cartData: {} });

    res.status(201).json({
      success: true,
      message: "Order placed",
    });
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    } else {
      res.status(400).json({
        success: false,
        message: error,
      });
    }
  }
}

//All orders data for admin panel
export async function allOrders(req: Request, res: Response) {
  try {
    const orders = await Order.find({});
    res.status(200).json({
      success: true,
      orders,
    });
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    } else {
      res.status(400).json({
        success: false,
        message: error,
      });
    }
  }
}

//user orders data for frontend
export async function userORders(req: Request, res: Response) {
  try {
    const { userId } = req.body;

    const orders = await Order.find({ userId });
    res.status(200).json({
      success: true,
      orders,
    });
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    } else {
      res.status(400).json({
        success: false,
        message: error,
      });
    }
  }
}

//update order status
export async function updateStatus(req: Request, res: Response) {
  try {
    const { orderId, status } = req.body;

    await Order.findByIdAndUpdate(orderId, { status });

    res.status(200).json({
      success: true,
      message: "Status Updated",
    });
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    } else {
      res.status(400).json({
        success: false,
        message: error,
      });
    }
  }
}
