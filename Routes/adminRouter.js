

const express=require("express");
const { login, userDetails,blockuser, addtrainingDetails, addacademic, addAnnouncement, fetchDonation, fetchPostDetails, verifyDonation } = require("../Controllers/adminController");
const adminAuth = require("../Middlewares/adminAuth");
const router=express.Router()

router.post('/login',login)
router.post('/blockuser', adminAuth,blockuser)
router.post('/addtraining',adminAuth,addtrainingDetails)
router.post('/addacademic',adminAuth,addacademic)
router.post('/addannouncement',addAnnouncement)
router.post('/verfiydonation/:donationId',adminAuth,verifyDonation)


//GET METHODS

router.get("/userdetails",adminAuth,userDetails)
router.get("/donatondetails",adminAuth,fetchDonation)
router.get("/fetchuserpost",adminAuth,fetchPostDetails)


module.exports = router;