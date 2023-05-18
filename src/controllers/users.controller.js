import usersModels from "../models/users.models.js";
import jwt from "jsonwebtoken";
import NodeCache from "node-cache";
import { sendEmail } from "../utils/email.utils.js";

const cache = new NodeCache({ stdTTL: 600 });
const min = 100000;
const max = 999999;
const code = Math.floor(Math.random() * (max - min + 1)) + min;

export const login = async (req, res) => {
  const email = req.body.email;
  const user = await usersModels.findOne({ email: email });
  if (user) {
    await sendEmail({ data: req.body, code: code });
    cache.set(req.body.email, code);
    res.json({
      id: user._id,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
      type: user.type,
    });
  } else {
    res.send("not found user");
  }
};

export const verifyUser = async (req, res) => {
  const code = cache.get(req.body.email);
  const user = await usersModels.findOne({ email: req.body.email });
  if (code === Number(req.body.code)) {
    res.json({
     data: user,
      token: jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, {
        expiresIn: "1d",
      }),
    });
  } else {
    res.send("wrong code");
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
      token: jwt.sign({ id: newUser._id }, process.env.JWT_SECRET_KEY, {
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
