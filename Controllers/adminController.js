const { json, response } = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const maxAge = 3 * 24 * 60 * 60;
const adminModel = require("../Model/adminModel");
const userModel = require("../Model/userModel");
require("dotenv").config();

const createToken = (id) => {
  return jwt.sign({ id }, "adminJWT", {
    expiresIn: maxAge,
  });
};

module.exports.login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const admin = await adminModel.findOne({ email });
    if (admin) {
      const auth = await bcrypt.compare(password, admin.password);
      if (auth) {
        const token = createToken(admin._id);
        res.json({ message: "Successfully logined", status: true, token });
      } else {
        res.json({ message: "Invailed Password", status: false });
      }
    } else {
      res.json({ message: "Admin not found ", status: false });
    }
  } catch (error) {
    console.log(error);
    return res.json({
      message: "Internal server in login page",
      status: false,
    });
  }
};

module.exports.userDetails = async (req, res, next) => {
  try {
    const users = await userModel.find({});
    if (users) {
      res.json({ message: "users founded", status: true, user: users });
    } else {
      res.json({ message: "No user found", status: false });
    }
  } catch (error) {
    console.log(error);
    res.json({
      message: "Internal server error in user details",
      status: false,
    });
  }
};
module.exports.blockuser = async (req, res, next) => {
  try {
    const userId = req.body.userId;
    const userDetails = await userModel.findById(userId);

    userDetails.blockStatus = !userDetails.blockStatus;
    await userDetails.save();

    if (userDetails.blockStatus) {
      return res.json({
        message: "User blocked successfully",
        status: userDetails.blockStatus,
      });
    } else {
      return res.json({
        message: "User unblocked successfully",
        status: userDetails.blockStatus,
      });
    }
  } catch (error) {
    console.log(error);
    res.json({ message: "Internal server error in block user", status: false });
  }
};
