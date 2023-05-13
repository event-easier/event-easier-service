import { Router } from "express";
import { updateById, deleteById } from "../controllers/users.controller.js";

const userRouter = Router();

userRouter.put("/:id", updateById);
userRouter.delete("/:id", deleteById);

export default userRouter;
