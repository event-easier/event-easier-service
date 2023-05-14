import usersModels from "../models/users.models.js";
import  jwt  from "jsonwebtoken";

export const login = async (res, req) => {
  const email = res.body.email;
  const user = await usersModels.findOne({ email: email });
  if (user) {
    req.json({
      id: user._id,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
      type: user.type,
      token: jwt.sign({ id: user._id }, process.env.PRIVATEKEY, {
        expiresIn: "1d",
      }),
    });
  } else {
    req.send("not found user");
  }
};

export const register = async (res, req) => {
  const { email, name, avatar, type } = res.body;
  const User = await usersModels.findOne({ email: email });
  if (User) {
    req.send("email already exis");
  } else {
    const newUser = await usersModels.create({ email, name, avatar, type });
    req.json({
      id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      avatar: newUser.avatar,
      type: newUser.type,
      token: jwt.sign({ id: newUser._id }, process.env.PRIVATEKEY, {
        expiresIn: "1d",
      }),
    });
  }
};

export const updateById = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }

  const id = req.params.id;

  usersModels
    .findByIdAndUpdate(id, req.body, { useFindAndModify: true, new: true })
    .then((data) => {
      // console.log(data);
      if (!data) {
        res.status(404).send({
          message: `Cannot update User with id=${id}. Maybe User was not found!`,
        });
      } else res.send({ message: "User was updated successfully.", data });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating User with id=" + id,
      });
    });
};

export const deleteById = (req, res) => {
  const id = req.params.id;

  usersModels
    .findByIdAndRemove(id, { useFindAndModify: true, new: true })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete User with id=${id}. Maybe User was not found!`,
        });
      } else {
        res.send({
          message: "User was deleted successfully!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete User with id=" + id,
      });
    });
};
