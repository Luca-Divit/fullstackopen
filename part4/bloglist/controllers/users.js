const userRouter = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");

userRouter.post("/", async (req, res) => {
  const { username, name, password } = req.body;
  const passwordHash = await bcrypt.hash(password, 10);
  const user = new User({ username, name, passwordHash });

  if (!user.username || !user.name || !password) {
    return res
      .status(400)
      .json({ error: "Username, name and password must be present" });
  }

  const result = await user.save();
  res.status(201).json(result);
});

userRouter.get("/", async (_req, res) => {
  const users = await User.find({});

  res.status(200).json(users);
});

module.exports = userRouter;
