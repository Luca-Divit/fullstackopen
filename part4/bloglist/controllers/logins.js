const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const loginRouter = require("express").Router();
const User = require("../models/user");

loginRouter.post("/", async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });
  const isPasswordValid =
    user === null ? false : await bcrypt.compare(password, user.passwordHash);

  if (!(user && isPasswordValid)) {
    return res.status(401).json({
      error: "Invalid username or password",
    });
  }

  const userForToken = {
    username: user.username,
    id: user.id,
  };

  const token = jwt.sign(userForToken, process.env.SECRET);

  return res.status(200).json({
    token,
    username: user.username,
    name: user.name,
  });
});

module.exports = loginRouter;
