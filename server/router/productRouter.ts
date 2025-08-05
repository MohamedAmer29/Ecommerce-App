import "dotenv/config";

import express from "express";
import {
  addProduct,
  listProduct,
  productInfo,
  removeProduct,
} from "../controllers/productController";
import upload from "../middlewares/multer";
import { adminAUth } from "../middlewares/adminAuth";

const productRouter = express.Router();

productRouter.get("/list", listProduct);
productRouter.post(
  "/add",
  adminAUth,
  upload.fields([
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
    { name: "image3", maxCount: 1 },
    { name: "image4", maxCount: 1 },
  ]),
  addProduct
);
productRouter.post("/remove", adminAUth, removeProduct);
productRouter.post("/single", productInfo);

export default productRouter;
