

const express=require("express");
const { login, userDetails,blockuser, addtrainingDetails } = require("../Controllers/adminController");
const router=express.Router()

router.post('/login',login)
router.post('/blockuser',blockuser)
router.post('/addtraining',addtrainingDetails)


//GET METHODS

router.get("/userdetails",userDetails)


module.exports = router;