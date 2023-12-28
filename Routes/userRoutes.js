const express=require("express")
const router=express.Router()
const cors = require('cors');
const { signup,login,userHeader, fetchAnnouncements, fetchTrainingDetails, fetchAcademicDetails, sendDonationReq, postSkill, userApprovedDonation } = require("../Controllers/userController");
const userAuth = require("../Middlewares/userAuth");
// const {uploadImage}=require("../Middlewares/multer")
const createMulterInstance=require("../Middlewares/multer")
const uploadPost= createMulterInstance('Post');
const DonationRequests=createMulterInstance("Requests")


//POST
router.post("/signup",signup)
router.post("/login",login)
router.post("/donationreq",userAuth,DonationRequests.single('image'),sendDonationReq)
router.post("/postskill",userAuth,uploadPost.single('photo'),postSkill)

//GET 
router.get("/",userAuth,userHeader)
router.get("/fetchannouncement",userAuth,fetchAnnouncements)
router.get("/fetchtrainingdetails",userAuth,fetchTrainingDetails)
router.get("/fetechacademicdetails",userAuth,fetchAcademicDetails)
router.get("/fetchApprovedDonation/:userId",userAuth,userApprovedDonation)

module.exports = router;

