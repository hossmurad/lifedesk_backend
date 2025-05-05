import mongoose from "mongoose";

const UsersSchema = new  mongoose.Schema(
    {
        email : { type: String, unique: true, required: true },
        password: { type: String, required: true },
        fname: { type: String, required: true },
        lname: { type: String, required: true },
        number: { type: String, required: true },
        otp : { type: String, default:0 },
     },
    {
        timestamps: true,
        versionKey: false
    }
)

const Users = mongoose.model('users',UsersSchema);
export  default Users;