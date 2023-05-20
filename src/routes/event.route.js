import { Router } from "express";
import { create,findOne, findAll, updateById } from "../controllers/events.controller.js";

const eventRouter = Router();

eventRouter.get("/:id", findOne);
eventRouter.post("/user", findAll);
eventRouter.post("/create", create);
eventRouter.post("/update/:id", updateById);

export default eventRouter;
