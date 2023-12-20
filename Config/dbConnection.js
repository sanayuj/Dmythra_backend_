const mongoose=require("mongoose")
mongoose.set('strictQuery', true)


module.exports = {

    dbConnect: async () => {
        try {
            await mongoose.connect("mongodb://localhost:27017/dmythra").then(() => {
                console.log("Database connected succefully")
            })
        } catch (err) {
            console.log(err)
        }
    },


}