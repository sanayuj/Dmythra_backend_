const mongoose=require("mongoose")

const announcementSchema=new mongoose.Schema({
    announcementTopic:{
        required:true,
        type:String
    },
    announcementDescription:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default:Date.now,
    }
})

module.exports=new mongoose.model("AnnouncementDetails",announcementSchema)