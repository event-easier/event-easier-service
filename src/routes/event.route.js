import { Router } from "express";
import {
  create,
  findOne,
  findAll,
  updateById,
  inviteGuests,
  confirm,
  newRegistration,
} from "../controllers/events.controller.js";
import { checkLogin } from "../middlewares/auth.middleware.js";

const eventRouter = Router();

eventRouter.get("/:id", findOne);
eventRouter.post("/user", findAll);
eventRouter.post("/create", checkLogin, create);
eventRouter.post("/update/:id", checkLogin, updateById);
eventRouter.post("/inviteGuests/:id", checkLogin, inviteGuests);
eventRouter.post("/confirm/:id", checkLogin, confirm);
eventRouter.post("/notification/:id", checkLogin, newRegistration);

export default eventRouter;
