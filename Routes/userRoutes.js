const express=require("express")
const router=express.Router()
const cors = require('cors');
const { signup,login,userHeader, fetchAnnouncements, fetchTrainingDetails, fetchAcademicDetails, sendDonationReq, postSkill } = require("../Controllers/userController");
const userAuth = require("../Middlewares/userAuth");
const {uploadImage}=require("../Middlewares/multer")



//POST
router.post("/signup",signup)
router.post("/login",login)
router.post("/donationreq",userAuth,uploadImage('./public/Images/Requests'),sendDonationReq)
router.post("/postskill",userAuth,uploadImage('./public/Images/Post'),postSkill)

//GET 
router.get("/",userAuth,userHeader)
router.get("/fetchannouncement",userAuth,fetchAnnouncements)
router.get("/fetchtrainingdetails",userAuth,fetchTrainingDetails)
router.get("/fetechacademicdetails",userAuth,fetchAcademicDetails)
module.exports = router;