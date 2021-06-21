const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const User = require("../../models/User");

// @route Get api/User
// @desc Register new User
// @access Public

router.post("/", (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    res.status(400).send({ msg: "Please enter all fields" });
  }

  User.findOne({ email }).then((user) => {
    if (user) return res.status(400).json({ msg: "User alread exists" });
  });

  const newUser = new User({
    name,
    email,
    password,
  });
});

module.exports = router;
