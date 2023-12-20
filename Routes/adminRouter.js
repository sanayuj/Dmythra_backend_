

const express=require("express");
const { login, userDetails,blockuser } = require("../Controllers/adminController");
const router=express.Router()

router.post('/login',login)
router.post('/blockuser',blockuser)


//GET METHODS

router.get("/userdetails",userDetails)


module.exports = router;