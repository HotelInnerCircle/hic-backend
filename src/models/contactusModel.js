const mongoose = require("mongoose");
const moment = require("moment");
require("moment-timezone");

moment.tz.setDefault("Asia/Kolkata");
let dates = moment().format("YYYY-MM-DD");
let times = moment().format("HH:mm:ss");


const contactUsSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    subject:{
        type: String,
        required: true
    },
    name:{
        type: String,
        required: true
    },
    deletedAt: {
        type: Date
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    
    date: {
        type: String,
        default:dates
    },
    time:{
        type:String,
        default:times
    }
},{timestamps:true})
module.exports = mongoose.model("contactUs",contactUsSchema)