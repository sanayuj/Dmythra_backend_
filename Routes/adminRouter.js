

const express=require("express");
const { login, userDetails,blockuser, addtrainingDetails, addacademic, addAnnouncement, fetchDonation, fetchPostDetails } = require("../Controllers/adminController");
const router=express.Router()

router.post('/login',login)
router.post('/blockuser',blockuser)
router.post('/addtraining',addtrainingDetails)
router.post('/addacademic',addacademic)
router.post('/addannouncement',addAnnouncement)


//GET METHODS

router.get("/userdetails",userDetails)
router.get("/donatondetails",fetchDonation)
router.get("/fetchuserpost",fetchPostDetails)


module.exports = router;