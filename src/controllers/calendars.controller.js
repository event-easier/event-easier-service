import mongoose from "mongoose";
import calendarModels from "../models/calendars.models.js";
import usersModels from "../models/users.models.js";
import eventsModels from "../models/events.models.js";
export const createCalendar = async (req, res) => {
  if (!req.body.calendarName) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }
  const {
    type,
    cover,
    avatar,
    calendarName,
    description,
    customURLlocation,
    color,
  } = req.body;
  const calendar = new calendarModels({
    type: type,
    cover: cover,
    avatar: avatar,
    calendarName: calendarName,
    description: description,
    customURLlocation: customURLlocation,
    color: color,
  });

  calendar
    .save()
    .then(async (data) => {
      await usersModels.findByIdAndUpdate(req.userId, {
        $push: {
          calendars: {
            id: data._id,
            role: "ADMIN",
          },
        },
      });
      res.status(200).send({
        message: "Clendar create successfull.",
        data: data,
      });
    })
    .catch((error) => {
      res.status(500).send({
        message:
          error.message || "Some error occurred while creating the Clendar.",
      });
    });
};

export const findCalendarsByUser = async (req, res) => {
  const user = await usersModels.findById(req.userId);
  const calendarId = user.calendars;
  const calendars = await calendarModels.find({ _id: { $in: calendarId } });
  if (!calendars) {
    res.status(500).send({
      message: err.message || "Some error occurred while find the Clendar.",
    });
  } else {
    res.status(200).send({
      message: "Clendar create successfull.",
      data: calendars,
    });
  }
};

export const findCalendarsById = async (req, res) => {
  const id = req.params.id;

  calendarModels
    .findById(id)
    .then((data) => {
      if (!data)
        res.status(404).send({ message: "Not found calendar with id " + id });
      else res.send(data);
    })
    .catch((error) => {
      res.status(500).send({
        message: "Error retrieving event with id=" + id,
        error: error,
      });
    });
};

export const updateCalendarsById = async (req, res) => {
  const calendarContent = req.body;

  try {
    const user = await usersModels.findOne({
      _id: req.userId,
      "calendars.id": req.params.id,
    });
    const admin = user.calendars.find((person) => {
      return person.id.toString() === req.params.id && person.role === "ADMIN";
    });
    if (!admin) {
      return res.status(404).send({ message: "cannot update calendars" });
    }
    const updatedCalendar = await calendarModels.findByIdAndUpdate(
      req.params.id,
      { $set: calendarContent },
      { new: true }
    );

    res.status(200).send({
      message: "updated calendars successfully with id=" + updatedCalendar._id,
      data: updatedCalendar,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      message: "Error updating calendar with id=" + req.params.id,
    });
  }
};

export const subscribe = async (req, res) => {
  try {
    const user = await usersModels.findOne({ _id: req.userId });
    const calendar = await calendarModels.findOne({ _id: req.params.id });

    if (!user || !calendar) {
      res.status(500).json({ message: "user or calendar not found}" });
      return;
    }

    const subscribedUser = calendar.people.find(
      (person) => person.user_id === req.userId
    );

    if (!subscribedUser) {
      calendar.people.push({
        avatar: user.avatar,
        name: user.name,
        user_id: user._id,
        gmail: user.email,
        subscribed: true,
      });
      user.calendars.push({ id: calendar._id, role: "GUEST" });
      await user.save();
      await calendar.save();
      res.status(200).json({ message: "success", data: calendar });
    } else {
      if (subscribedUser.subscribed === false) {
        subscribedUser.subscribed = true;
        await calendar.save();
        res.status(200).json({ message: "success", data: calendar });
      } else {
        res
          .status(400)
          .json({ message: "You have already subscribed", data: calendar });
      }
    }
  } catch (error) {
    res.status(500).json({ message: "error", error: error });
  }
};

export const unSubscribe = async (req, res) => {
  try {
    const user = await usersModels.findOne({ _id: req.userId });
    const calendar = await calendarModels.findOne({ _id: req.params.id });

    if (!user || !calendar) {
      res.status(500).json({ message: "user or calendar not found" });
      return;
    }
    const subscribedUser = calendar.people.find((person) => {
      return person.user_id === req.userId && person.subscribed === true;
    });

    if (!subscribedUser) {
      res
        .status(500)
        .json({ message: "You have not subscribed to this calendar yet." });
      return;
    }
    subscribedUser.subscribed = false;
    await calendar.save();
    res.status(200).json({ message: "unsub success", data: calendar });
  } catch (error) {
    res.status(500).json({ message: "error", error: error });
  }
};

export const deleteCalendar = async (req, res) => {
  const user = await usersModels.findOne({
    _id: req.userId,
    "calendars.id": req.params.id,
  });
  const admin = user.calendars.find((person) => {
    return person.id.toString() === req.params.id && person.role === "ADMIN";
  });
  if (!admin) {
    return res.status(404).json({ message: "cannot delete this calendar" });
  } else {
    const deletedCalendar = await calendarModels.findOneAndDelete({
      _id: req.params.id,
    });

    if (deletedCalendar) {
      const eventIds = deletedCalendar.events;
      await eventsModels.deleteMany({ _id: { $in: eventIds } });
      await usersModels.updateOne(
        { _id: req.userId },
        { $pull: { calendars: { id: deletedCalendar.id } } }
      );
      res.status(200).json({
        message: "delete success",
        data: deletedCalendar,
        deleteEvent: eventIds,
      });
    } else {
      res.status(500).json({ message: "error" });
    }
  }
};
