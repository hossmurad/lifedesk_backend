import mongoose from "mongoose";

const entertainmentSchema = mongoose.Schema(
    {
        name: { type: String, required: true },
        img_URL: { type: String },
        status: { type: String, required: true },
        director: { type: String, required: true },
        user_id :{type: mongoose.Schema.Types.ObjectId, required: true },
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

const Entertainment = mongoose.model("movies", entertainmentSchema);
export default Entertainment;
