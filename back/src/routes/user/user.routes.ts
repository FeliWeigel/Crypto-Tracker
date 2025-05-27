import { Router } from "express";
import { UserController } from "../../controller/user.controller";

export const userRouter = Router()

const userController = new UserController()

userRouter.get("/all", userController.getUsers)
userRouter.post("/login", userController.loginUser)
userRouter.post("/register", userController.registerUser)