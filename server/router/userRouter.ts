import express from "express";
import { adminLogin, login, register } from "../controllers/userControllers";

const userRouter = express.Router();

userRouter.post("/login", login);
userRouter.post("/register", register);
userRouter.post("/admin", adminLogin);

export default userRouter;
