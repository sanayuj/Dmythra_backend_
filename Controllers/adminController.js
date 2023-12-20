const { json, response } = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const maxAge = 3 * 24 * 60 * 60;
const adminModel = require("../Model/adminModel");
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
