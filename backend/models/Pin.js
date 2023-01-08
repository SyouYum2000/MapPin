const mongoose = require("mongoose")

const PinSchema = new mongoose.Schema({
    username:{
        type:String,
        require:true,
        min:1
    },
    title:{
        type:String,
        require:true,
        min:3
    },
    desc:{
        type:String,
        require:true,
        min:5
    },
    rating:{
        type:Number,
        require:true,
        min:1,
        max:5
    },
    lat:{
        type:Number,
        require:true,
    },
    long:{
        type:Number,
        require:true,
    }
},{timestamps:true}
);

module.exports = mongoose.model("Pin",PinSchema)