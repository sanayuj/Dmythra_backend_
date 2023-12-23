const express=require("express")
const router=express.Router()
const cors = require('cors');
const { signup,login,userHeader, fetchAnnouncements, fetchTrainingDetails } = require("../Controllers/userController");
const userAuth = require("../Middlewares/userAuth");



//POST
router.post("/signup",signup)
router.post("/login",login)



//GET 
router.get("/",userAuth,userHeader)
router.get("/fetchannouncement",userAuth,fetchAnnouncements)
router.get("/fetchtrainingdetails",userAuth,fetchTrainingDetails)

module.exports = router;