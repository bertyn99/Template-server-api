import * as userService from "../services/userService.js";
import { successRes, errorRes } from "../common/response.js";

async function register(req, res) {
  try {
    const user = await userService.register(req.body);
    successRes(res, user, 201);
  } catch (e) {
    errorRes(res, e, 400);
  }
}

async function logIn(req, res) {
  try {
    const user = await userService.logIn(req.body.email, req.body.password);
    successRes(res, user, 201);
  } catch (e) {
    errorRes(res, e, 400);
  }
}

async function myInfo(req, res) {
  try {
    const user = await userService.myInfo(req.params.id);
    res.status(200).send(user);
  } catch (e) {
    res.status(404).send("This is a wrong id");
  }
}

async function updateInfo(req, res) {
  try {
    const user = await userService.updateInfo(req.user, req.body);
    res.send(user);
  } catch (e) {
    res.status(400).send(e);
  }
}

async function deleteUser(req, res) {
  try {
    const user = await userService.deleteUser(req.user);
    res.send(user);
  } catch (e) {
    res.status(500).send(e);
  }
}

export default {
  register,
  logIn,
  myInfo,
  updateInfo,
  deleteUser,
};
