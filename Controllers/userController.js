const { json, response } = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const maxAge = 3 * 24 * 60 * 60;
const userModel = require("../Model/userModel");
const announcementModel=require("../Model/announcementModel")
const trainingModel=require("../Model/TrainingModel")
const academicModel=require("../Model/academicModel")
const donationModel=require("../Model/donationRequestModel")
const userPostModel=require("../Model/postModel")
const path = require("path");

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
  const { emailId, loginPassword } = req.body;
console.log(req.body);
  try {
    const user = await userModel.findOne({email: emailId });
    if (user) {
      const passwordMatch = await bcrypt.compare(loginPassword, user.password);
      if (passwordMatch) {
        const token = createToken(user._id);
        return res.status(200).json({
          user,
          message: "Authentication successful",
          success: true,
          token,
        });
      } else {
        return res.json({ message: "Incorrect password", success: false });
      }
    } else {
      return res.json({ message: "User not found", success: false });
    }
  } catch (error) {
    return res.json({ message: "Internal server error", success: false });
  }
};

module.exports.userHeader = async (req, res, next) => {
  try {
    const userDetails = req.user;
    return res.json({ status: true, userDetails: userDetails });
  } catch (error) {
    console.log(error);
    return res.json({
      message: "Internal server error in useHeader",
      status: false,
    });
  }
};

module.exports.fetchAnnouncements=async(req,res,next)=>{
  try{
    const data=await announcementModel.find()
    res.json({message:"announcement fetched",status:true,Announcement:data})
  }catch(error){
    console.log(error)
    res.json({message:"Internal server error in fetch announcement",status:false})
  }
}

module.exports.fetchTrainingDetails=async(req,res,next)=>{
  try{
     const trainingDetails=await trainingModel.find()
    res.json({message:"Training class fetched",status:true,data:trainingDetails})
  }catch(error){
    console.log(error);
    res.json({message:"Internal server error in fetch training class ",status:false})
  }
}

module.exports.fetchAcademicDetails=async(req,res,next)=>{
  try{
    const academicDetails=await academicModel.find()
    res.json({message:"Academic class fetched",status:true,data:academicDetails})

  }catch(error){
    console.log(error);
    res.json({message:"Internal server error in fetch academic details",status:false})
  }
}

module.exports.sendDonationReq = async (req, res, next) => {
  try {

    const extractImageUrl = (fullPath) => {
      const relativePath = path.relative("public/images", fullPath);
      const imageUrl = relativePath.replace(/\\/g, '/');
      return imageUrl;
    };

    const newDonationRequest = new donationModel({
      requestDescription: req.body.description,
      imageUrl: extractImageUrl(req.file.path),
      requestTitle: req.body.situation,
      ownerId: req.body.userId,
    });

    await newDonationRequest.save();
    
    res.json({ message: "Successfully submitted", status: true });
  } catch (error) {
    console.log(error);
    res.json({ message: "Internal server error in donation request", status: false });
  }
};


  module.exports.postSkill=async(req,res,next)=>{
    try{
      console.log(req.body,"BBBOODDDYY");
      const extractImageUrl = (fullPath) => {
        const relativePath = path.relative("public/images", fullPath);
        const imageUrl = relativePath.replace(/\\/g, '/');
        return imageUrl;
      };

      const newUserPosts = new userPostModel({
        postCaption: req.body.caption,
        imageUrl: extractImageUrl(req.file.path),
        ownerId: req.body.userId,
      });
      await newUserPosts.save()
       res.json({message:"Successfully submitted",status:true})
    }catch(error){
      console.log(error);
      res.json({message:"Internal server error in post skill",status:false})
    }
  }

  module.exports.userApprovedDonation=async(req,res,next)=>{
    try{
      const userId=req.params.userId
      const approvedDonation=await donationModel.find({ownerId:userId,Verified: true,})
      return res.json({message:"fetch approved donation",status:true,data:approvedDonation})
    }catch(error){
      console.log(error);
      res.json({message:"Internal server error in fetching approved donation",status:false})
    }
  }