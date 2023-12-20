const { json, response } = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const maxAge = 3 * 24 * 60 * 60;
const userModel = require("../Model/userModel");
require("dotenv").config();

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRETE_KEY, {
    expiresIn: maxAge,
  });
};

module.exports.signup = async (req, res, next) => {
  const { email, password, username } = req.body;
  try {
    const emailExist = await userModel.findOne({ email: email });
    if (emailExist) {
      return res.json({ message: "Email already exists", status: false });
    }
    const newUser = new userModel({
      userName: username,
      email: email,
      password: password,
      verified: true,
    });
    const userDetails = await newUser.save();
    const token = createToken(userModel._id);
    return res.json({
      message: "Account created successfully",
      status: true,
      token,
    });
  } catch (error) {
    console.log(error);
    return res.json({ message: "Internal server in sign up", status: false });
  }
};

module.exports.login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const existTrue = await userModel.findOne({ email });
    if (existTrue) {
      const auth = await bcrypt.compare(password, existTrue.password);
      if (auth) {
        const token = createToken(existTrue._id);
        return res.json({
          message: "Successfully logged in",
          status: true,
          userDetails: existTrue,
          token,
        });
      } else {
        return res.json({ message: "Incorrect password", status: false });
      }
    } else {
      return res.json({ message: "Account not found", status: false });
    }
  } catch (error) {
    console.log(error);
    return res.json({
      message: "Internal server error in the login page",
      status: false,
    });
  }
};


module.exports.userHeader=async(req,res,next)=>{
  try{
    const userDetails=req.user
    return res.json({status:true,userDetails:userDetails})
  }catch(error){
    console.log(error)
    return res.json({message:"Internal server error in useHeader",status:false})
  }
}
