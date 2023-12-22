

const express=require("express");
const { login, userDetails,blockuser, addtrainingDetails, addacademic, addAnnouncement } = require("../Controllers/adminController");
const router=express.Router()

router.post('/login',login)
router.post('/blockuser',blockuser)
router.post('/addtraining',addtrainingDetails)
router.post('/addacademic',addacademic)
router.post('/addannouncement',addAnnouncement)


//GET METHODS

router.get("/userdetails",userDetails)


module.exports = router;