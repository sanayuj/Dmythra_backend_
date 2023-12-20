const jwt=require("jsonwebtoken")
const userModel=require("../Model/userModel")
module.exports=async(req,res,next)=>{
    try{
        const authHeader=req.headers.authorization
        const authToken=authHeader && authHeader.split(" ")[1];
        if(!authToken){
          return res.json({
                message:"No Token",
                status:false,
                loginFail:true
            })
        }
        const decoded=jwt.verify(authToken,process.env.JWT_SECRETE_KEY)
        console.log(decoded,"++++++");
        const user=await userModel.findOne({_id:decoded.id})
        console.log(user,"MIDDLE");
        if(!user){
            return res.json({message:"Unauthorized",loginFail:true,status:false})
        }
        req.user=user
        next()
    }catch(error){
        console.log(error);
        return res.json({message:"Internal server error in user's middleware (Unauthorized access)",status:false,loginFail:true})
    }
}