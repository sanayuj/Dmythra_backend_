const mongoose=require("mongoose")

const TrainingSchema=new mongoose.Schema({
    videoName:{
        type:String,
        required:true
    },
    videoDescription:{
        type:String,
        required:true
    },
    videoLink:{
        type:String,
        required:true
    }
})

module.exports=new mongoose.model("TrainingDetails",TrainingSchema)