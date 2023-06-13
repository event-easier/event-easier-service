import { Router } from "express";
import {
  create,
  findOne,
  findAll,
  updateById,
} from "../controllers/events.controller.js";
import { checkLogin } from "../middlewares/auth.middleware.js";

const eventRouter = Router();

eventRouter.get("/:id", checkLogin, findOne);
eventRouter.post("/user", checkLogin, findAll);
eventRouter.post("/create", checkLogin, create);
eventRouter.post("/update/:id", checkLogin, updateById);

export default eventRouter;
