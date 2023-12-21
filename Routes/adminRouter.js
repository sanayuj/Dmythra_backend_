

const express=require("express");
const { login, userDetails,blockuser, addtrainingDetails, addacademic } = require("../Controllers/adminController");
const router=express.Router()

router.post('/login',login)
router.post('/blockuser',blockuser)
router.post('/addtraining',addtrainingDetails)
router.post('/addacademic',addacademic)


//GET METHODS

router.get("/userdetails",userDetails)


module.exports = router;