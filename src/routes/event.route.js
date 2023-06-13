import { Router } from "express";
import {
  create,
  findOne,
  findAll,
  updateById,
} from "../controllers/events.controller.js";
import { checkLogin } from "../middlewares/auth.middleware.js";

const eventRouter = Router();

eventRouter.get("/user/:id", checkLogin, findOne);
eventRouter.get("/user", checkLogin, findAll);
eventRouter.post("/create", checkLogin, create);
eventRouter.post("/update/:id", checkLogin, updateById);

export default eventRouter;
