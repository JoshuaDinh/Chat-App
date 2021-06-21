const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");
const User = require("../../models/User");

// @route Post api/User
// @desc Register new User
// @access Public

router.post("/", (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    res.status(400).send({ msg: "Please enter all fields" });
  }

  // Check for existing User
  User.findOne({ email }).then((user) => {
    if (user) return res.status(400).json({ msg: "User already exists" });
  });

  // Creates User instance
  const newUser = new User({
    name,
    email,
    password,
  });

  // Create salt & hash - password encryption
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(newUser.password, salt, (err, hash) => {
      if (err) throw err;
      newUser.password = hash;
      newUser.save().then((user) => {
        //Verify User & create auth token
        jwt.sign(
          { id: user.id },
          config.get("jwtSecret"),
          { expiresIn: 3600 },
          (err, token) => {
            if (err) throw err;
            res.json({
              user: {
                name: user.name,
                id: user.id,
                email: user.email,
                token,
              },
            });
          }
        );
      });
    });
  });
});

module.exports = router;
