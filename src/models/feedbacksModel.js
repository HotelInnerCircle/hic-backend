const mongoose = require("mongoose");
const moment = require("moment");
require("moment-timezone");

moment.tz.setDefault("Asia/Kolkata");
let dates = moment().format("YYYY-MM-DD");
let times = moment().format("HH:mm:ss");

const feedBackSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    roomType: {type: String, required: true,},
    roomNo: { type: Number, required: true },
    rating: { type: Number, required: true },
    subject: { type: String, required: true },
    comments: { type: String, required: true },
    date: { type: String,default: dates,},
    time: {type: String,default: times,},
    deletedAt: {type: Date,},
    isDeleted: {type: Boolean,default: false},
  },
  { timestamps: true }
);

module.exports = mongoose.model("feedback", feedBackSchema);
