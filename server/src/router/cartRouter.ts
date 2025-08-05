import express from "express";
import { addToCart, getCart, updateCart } from "../controllers/cartControllers";
import authUser from "../middlewares/auth";

const cartRouter = express.Router();

cartRouter.post("/get", authUser, getCart);
cartRouter.post("/add", authUser, addToCart);
cartRouter.post("/update", authUser, updateCart);

export default cartRouter;
