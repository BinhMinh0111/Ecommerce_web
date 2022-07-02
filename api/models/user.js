const mongoose = require("mongoose");

//Create user object
const userSchema = new mongoose.Schema(
    {
        username:{type: String, require: true, unique: true},
        email:{type:String, require: true, unique:true},
        password:{type:String, require:true, unique: false},
        isAdmin:{
            type:Boolean,
            default:false
        },
    },
    // {createdAt: Date.now()}
    {timestamps:true}
);

module.exports = mongoose.model("User", userSchema);