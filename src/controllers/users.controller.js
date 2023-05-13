import usersModels from "../models/users.models.js";

export const updateById = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;

  usersModels.findByIdAndUpdate(id, req.body, { useFindAndModify: true, new :true })
    .then(data => {
      // console.log(data);
      if (!data) {
        res.status(404).send({
          message: `Cannot update User with id=${id}. Maybe User was not found!`
        });
      } else res.send({ message: "User was updated successfully.", data });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating User with id=" + id
      });
    });
};

export const deleteById = (req, res) => {
  const id = req.params.id;

  usersModels.findByIdAndRemove(id, { useFindAndModify: true, new :true  })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete User with id=${id}. Maybe User was not found!`
        });
      } else {
        res.send({
          message: "User was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete User with id=" + id
      });
    });
};