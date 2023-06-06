import { Router } from "express";
import { updateById, deleteById, login, register, verifyUser } from "../controllers/users.controller.js";
import { sendEmail } from "../utils/email.utils.js";
import { checkLogin } from "../middlewares/auth.middleware.js";

const userRouter = Router();

userRouter.put("/:id",checkLogin ,updateById);
userRouter.delete("/:id", checkLogin,deleteById);
userRouter.post("/login", login);
userRouter.post("/login/verify", verifyUser);
userRouter.post("/register", register);

export default userRouter;
