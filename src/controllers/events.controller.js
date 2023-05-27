import mongoose from "mongoose";
import eventsModels from "../models/events.models.js";
import { createZoomMeeting } from "../utils/zoom.utils.js"

export const create = async (req, res) => {
  if (!req.body.name) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }
  // Create a event
  // Check type
  const { type } = req.body;
  let data_event_type = {};
  if (type.event_type == 'IN_PERSON') {
    data_event_type = {
      event_type: type.event_type,
      location: type.location,
    }
  }
  else if (type.event_type == 'VIRTUAL') {
    data_event_type = {
      event_type: type.event_type,
      event_url: type.event_url,
    }
  }
  else if (type.event_type == 'ZOOM') {
    const data = await createZoomMeeting();
    data_event_type = {
      event_type: type.event_type,
      zoom_url: data.joinUrl,
      zoom_id: data.zoomMeeting.id,
      zoom_password: data.zoomMeeting.password,
    }
  }
  const event = new eventsModels({
    name: req.body.name,
    type: data_event_type,
    cover: req.body.cover,
    start_time: req.body.start_time,
    end_time: req.body.end_time,
    require_approve: req.body.require_approve ? req.body.require_approve : false,
    hosts: req.body.hosts,
    guests: req.body.guests
  });

  // Save event in the database
  event
    .save()
    .then(data => {
      res.status(200).send({
        message: "Event create successfull.",
        data: data
      })
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the event."
      });
    });
};

export const findOne = (req, res) => {
  const id = req.params.id;

  eventsModels.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found event with id " + id });
      else {
        res.status(200).send({
          message: "Event found successfull.",
          data: data
        })
      }
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving event with id=" + id });
    });
};

export const findAll = (req, res) => {
  const user_id = req.userId;
  // create an condition
  const condition = {
    $or: [
      { "hosts.user_id": user_id ? user_id : "" },
      { "guests.user_id": user_id ? user_id : "" },
    ]
  };
  // query condition
  eventsModels.find(condition)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found event with id " + id });
      else {
        res.status(200).send({
          message: "Events found successfull.",
          data: data
        })
      }
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Events."
      });
    });
};

export const updateById = (req, res) => {

  const id = req.params.id;
  const event = req.body;
  const userId = req.userId;
  if (!event) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  } else {
    eventsModels.findByIdAndUpdate(id, event, { new: true })
      .then(data => {
        if (!data) {

          res.status(404).send({ message: "Not found event with id " + id });
        } else res.send(data);
      })
      .catch(err => {

        res.status(500).send({
          message: "Error updating event with id=" + id
        });
      });
  }

};