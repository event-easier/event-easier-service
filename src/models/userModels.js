const mongoose = require("mongoose");

const userModel = mongoose.Schema({
    name:{type:String, require:true},
    email:{type:String, require:true},
    avatar:{type:String, require:true, default: "https://i0.wp.com/thatnhucuocsong.com.vn/wp-content/uploads/2023/02/hinh-avatar-anh-dai-dien-FB-mac-dinh.jpg?ssl\u003d1"},
    accountType: {type: String, require:true, default:"normal"}
})

const UserModel = mongoose.model("UserModel", userModel);
module.exports = UserModel;
