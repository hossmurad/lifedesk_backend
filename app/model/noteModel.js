import mongoose from "mongoose";

const NoteSchema = new mongoose.Schema(
    {
        title:{type:String,required: true},
        description:{type:String,required: true},
        user_id:{type:mongoose.Schema.Types.ObjectId, required:true},
    },
    {
        timestamps: true,
        versionKey:false
    }
)

const Notes = mongoose.model("notes", NoteSchema);

export default Notes;