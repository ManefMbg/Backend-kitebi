import express from "express";
import { User } from "../models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import isAuth from "../middleware/isAuth.js";

const router = express.Router();


router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const foundUser = await User.findOne({ email });
    if (foundUser) {
      return res.status(400).send({ msg: "User already exist!!" });
    }
    const newUser = new User({ ...req.body });
    const saltRounds = 10;
    const hashPassword = await bcrypt.hash(password, saltRounds);
    newUser.password = hashPassword;
    await newUser.save();

    const token = jwt.sign(
      {
        id: newUser._id,
      },
      process.env.SECRET_KEY,
      { expiresIn: "2h" }
    );

    res
      .status(200)
      .send({ msg: "User registered successfully...", User: newUser, token });
  } catch (error) {
    res.status(500).send({ msg: "User cannot register!!!" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const foundUser = await User.findOne({ email });
    if (!foundUser)
      return res.status(400).send({ error: [{ msg: "Bad credential" }] });
    const checkPassword = await bcrypt.compare(password, foundUser.password);
    if (!checkPassword)
      return res.status(400).send({ error: [{ msg: "Bad credential" }] });

    const token = jwt.sign(
      {
        id: foundUser._id,
      },
      process.env.SECRET_KEY,
      { expiresIn: "2h" }
    );
    res
      .status(200)
      .send({ msg: "login successfully .. ", user: foundUser, token });
  } catch (error) {
    res.status(400).send({ msg: "User can not login!!!" });
  }
});

router.get('/current',isAuth, (req, res) => {
  res.send(req.user);
});


export { router as AuthRouter };