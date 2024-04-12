const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { validationResult } = require('express-validator');

exports.registerUser = async (req, res) => {

  try {
    const errors = validationResult(req);
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(409).json({ msg: "User already exists" });
    }
    else {
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      var user = new User({
        firstname: req.body.firstname,
        middlename: req.body.middlename,
        lastname: req.body.lastname,
        email: req.body.email,
        password: await bcrypt.hash(req.body.password, parseInt(process.env.salt)), //for generation of hash
        role: req.body.role,
        phone: req.body.phone,
        dob: req.body.dob,
        gender: req.body.gender
      });
      console.log(user);
      await user.save();
      res.send({ type: "success", msg: "Account created successfully" });
    }
  } catch (err) {
    console.log(err);
    res.send({ type: "error", msg: "Failed to create the user" });
  }

};
exports.login = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const user = await User.findOne({ email: req.body.email });
    if (user.email) {
      if (user.role == req.body.role) {
        var match = await bcrypt.compare(req.body.password, user.password);
        if (match) {
          delete user._doc.password;
          delete user._doc.__v;
          const token = jwt.sign(
            {
              _id: user._id,
              email: user.email,
              name: user.name,
            },
            process.env.SECRET,
            { expiresIn: "6h" }
          );
          //console.log('Token: -------> ', token);
          res.cookie("token", token, { maxAge: 900000, httpOnly: true, sameSite: "lax" });
          res.send(user);
        } else {
          res.send({ type: "error", msg: "Wrong password" });
        }
      } else {
        res.send({ type: "error", msg: "User not found" });
      }
    }
    else {
      res.send({ type: "error", msg: "User Account Not Found" })
    }
  } catch (err) {
    console.log(err);
    res.send({ type: "error", msg: "Failed to login" });
  }
};

exports.authorizeToken = (req, res, next) => {
  if (req.cookies.token) {
    jwt.verify(req.cookies.token, process.env.SECRET, (err, decoded) => {
      if (!err) {
        req.user = decoded;
        next();
      } else {
        res.cookie("token", "");
        console.log(err)
        res.status(401).send({ msg: "ACCESS_DENIED" });
      }
    });
  } else {
    res.cookie("token", "");
    res.status(401).send({ msg: "ACCESS_DENIED" });
  }
};
exports.logout = (req, res) => {
  res.cookie("token", "");
  res.send({ msg: "Logged out" });
};
exports.getUser = (req, res) => {
  try {
    const { _id } = req.user;
    console.log(req.user);

    User.findById(_id, (err, data) => {
      if (err) {
        console.log(err);
        res.cookie("token", "");
        res.send({ msg: "Logged out" });
      } else if (data) {
        res.send(data);
      } else {
        res.cookie("token", "");
        res.send({ msg: "Logged out" });
      }
    });
  } catch (err) {
    console.log(err);
    res.cookie("token", "");
    res.send({ msg: "Logged out" });
  }
};
exports.checkIfUserHasVoted = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    if (user.voted) {
      return res.status(400).json({ msg: "You have already voted." });
    }
    next();
  } catch (err) {
    console.log(err);
    res.status(500).send({ msg: "Server error" });
  }
};
exports.vote = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }
    else{
    if(user.voted == true){
      res.status(200).json({ msg: "Vote Already submitted." });
    }
    else{
    user.voted = true;
    await user.save();
    res.status(200).json({ msg: "Vote submitted successfully." });
  }
  }
  } catch (err) {
    console.log(err);
    // Send a server error response
    res.status(500).json({ msg: "Server error" });
  }
};


