import { Router } from "express";
import { checkLogin } from "../middlewares/auth.middleware.js";
import {
  subscribe,
  createCalendar,
  findCalendarsById,
  findCalendarsByUser,
  updateCalendarsById,
  unSubscribe,
  deleteCalendar,
} from "../controllers/calendars.controller.js";

const calendarRouter = Router();
calendarRouter.post("/create", checkLogin, createCalendar);
calendarRouter.post("/", checkLogin, findCalendarsByUser);
calendarRouter.post("/:id", checkLogin, findCalendarsById);
calendarRouter.post("/update/:id", checkLogin, updateCalendarsById);
calendarRouter.post("/subscribe/:id", checkLogin, subscribe);
calendarRouter.post("/unsubscribe/:id", checkLogin, unSubscribe);
calendarRouter.post("/delete/:id", checkLogin, deleteCalendar);
export default calendarRouter;
