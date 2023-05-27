import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name:{
        type: String,
        require: true,
    },
    email:{
        type:String,
        require: true,
    },
    avatar:{
        type: String,
    },
    type:{
        type: String,
        require: true,
    }
})

export default mongoose.model('users', UserSchema);