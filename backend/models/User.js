const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
    username :{
        type:String,
        require:true,
        min:1,
        max:20,
        unique:true,
    },
    email:{
        type:String,
        require:true,
        min:6,
        unique:false,
    },
    password:{
        type:String,
        require:true,
        min:8,
        max:20,
    }
},{timestamps:true}
);

module.exports = mongoose.model("User",UserSchema)