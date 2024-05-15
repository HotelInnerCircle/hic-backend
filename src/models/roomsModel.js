const mongoose = require('mongoose');
const { Schema } = mongoose;
const moment = require("moment");
require("moment-timezone");

moment.tz.setDefault("Asia/Kolkata");
let dates = moment().format("YYYY-MM-DD");
let times = moment().format("HH:mm:ss");
const roomSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true,
        unique:true
    },
    price: {
        type: Number,
        required: true
    },
    adults: {
        type: Number,
        require: true
    },
    childrents: {
        type: Number,
        required: true
    },
    bed: {
        type: String,
        required: true
    },
 
    Cancellation: {
        type: String,
        // required: true,
    },

    amenities: {
        type: Array,
        require: true,
    },
  
    is_block: {
        type: Boolean,
        default: false
    },
    discountPrice: {
        type: Number,
        default: 0,
    },
    discount: {
        type: Number,
        default: 0
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

}, { timestamps: true })
const Room = mongoose.model('Room', roomSchema
);

module.exports = Room;
