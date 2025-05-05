import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema(
    {
        title:{type:String,default:null},
        description:{type:String,required: true},
        user_id:{type:mongoose.Schema.Types.ObjectId, required:true},
    },
    {
        timestamps: true,
        versionKey:false
    }
)

const Tasks = mongoose.model("tasks", TaskSchema);

export default Tasks;