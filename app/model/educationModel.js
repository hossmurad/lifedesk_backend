import mongoose from "mongoose";

const educationSchema = mongoose.Schema(
    {
        title: { type: String, required: true },
       file:{type:String,required: true},
        user_id:{type:mongoose.Schema.Types.ObjectId, required: true},
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

const Education = mongoose.model("educations", educationSchema);
export default Education;
