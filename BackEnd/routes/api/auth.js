const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");
const User = require("../../models/User");

// @route Post api/auth
// @desc Auth User
// @access Public

router.post("/", (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).send({ msg: "Please enter all fields" });
  }

  // Check for existing User
  User.findOne({ email }).then((user) => {
    if (!user) return res.status(400).json({ msg: "User does not exists" });

    // Validate password
    bcrypt.compare(password, user.password).then((isMatch) => {
      if (!isMatch)
        return res.status(400).json({
          msg: "Invalid credentials",
        });
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

module.exports = router;
