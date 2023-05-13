import { Router } from "express";
import { updateById, deleteById, login, register } from "../controllers/users.controller.js";

const userRouter = Router();

userRouter.put("/:id", updateById);
userRouter.delete("/:id", deleteById);
userRouter.post("/", login);
userRouter.post("/register", register);

export default userRouter;
