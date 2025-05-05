import mongoose from "mongoose"

const healthSchema = new mongoose.Schema(
    {
        title:{type:String,required:true},
        img_url:{type:String,required:true},
        description:{type:String,required:true}
    },
    {
        timestamps:true,
        versionKey:false
    }
)

const Health = mongoose.model("health", healthSchema)
export default Health