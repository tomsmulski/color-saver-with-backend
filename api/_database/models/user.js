import mongoose from "mongoose";

export const UserSchema = new mongoose.Schema({
    nickName:{
        type: String,
        required: true,
    },
})
