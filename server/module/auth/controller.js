import jwt from "jsonwebtoken";
import {
  registerUserService,
  deleteUserService,
  verifyUserService,
  verifyOptService,
} from "./service.js";

export async function registerUserController(req, res) {
  try {
    const { username, email, password } = req.body;
    const result = await registerUserService({
      username,
      email,
      password,
    });

    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

export async function verifyOptController(req, res) {
  try {
    const { email, opt } = req.body;
    const result = await verifyOptService(email, opt);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

export async function deleteUserController(req, res) {
  try {
    const { id, password } = req.body;
    const result = await deleteUserService(id, password);
    res.status(200).json({ messages: `${result.username} deleted successfully` });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

export async function loginController(req, res) {
  try {
    const { username, password } = req.body;
    const result = await verifyUserService({
      username,
      password,
    });
    const refreshToken = jwt.sign({ id: result.id }, process.env.REFRESH_TOKEN_SECRET, {
      expiresIn: "15m",
    });
    const accessToken = jwt.sign({ id: result.id }, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "15m",
    });
    res
      .cookie("accessToken", accessToken, {
        httpOnly: true,
        maxAge: 15 * 60 * 1000,
      })
      .cookie("refreshToken", refreshToken, {
        httpOnly: true,
        maxAge: 15 * 60 * 1000,
      })
      .status(200)
      .send({ message: "successfuly Login" });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
}
