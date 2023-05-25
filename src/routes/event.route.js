import { Router } from "express";
import {
  create,
  findOne,
  findAll,
  updateById,
  inviteGuests,
} from "../controllers/events.controller.js";
import { checkLogin } from "../middlewares/auth.middleware.js";

const eventRouter = Router();

eventRouter.get("/:id", findOne);
eventRouter.post("/user", findAll);
eventRouter.post("/create", checkLogin, create);
eventRouter.post("/update/:id", checkLogin, updateById);
eventRouter.post("/manage/:id", checkLogin, inviteGuests);

export default eventRouter;
