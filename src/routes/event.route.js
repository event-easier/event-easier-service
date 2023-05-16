import { Router } from "express";
import { create,findOne, findAll } from "../controllers/events.controller.js";

const eventRouter = Router();

eventRouter.get("/:id", findOne);
eventRouter.post("/user", findAll);
eventRouter.post("/create", create);

export default eventRouter;
