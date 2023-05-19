import eventsModels from "../models/events.models.js";

export const create = (req, res) => {
  if (!req.body.name) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }
  // Create a event
  const event = new eventsModels({
    name: req.body.name,
    type: req.body.type,
    cover: req.body.cover,
    location: req.body.location,
    start_time: req.body.start_time,
    end_time: req.body.end_time,
    require_approve: req.body.require_approve ? req.body.require_approve : false,
    hosts: req.body.hosts,
    guests: req.body.guests
  });

  // Save event in the database
  event
    .save(event)
    .then(data => {
      res.send(data);
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
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving event with id=" + id });
    });
};

export const findAll = (req, res) => {
  const { user_id } = req.body;
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
      res.send(data);
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
  if(!event){
    res.status(400).send({message: "Content can not be empty!"});
    return;
  }else{
    eventsModels.findByIdAndUpdate(id, event, { new: true })
    .then(data => {
        if (!data) {
          console.log(data)
          res.status(404).send({ message: "Not found event with id " + id });
        } else res.send(data);
      })
    .catch(err => {
      console.log(err);
        res.status(500).send({
          message: "Error updating event with id=" + id
        });
      });
  }
};