const mongoose = require("mongoose");

const guestSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  phone: {
    type: String,
    require: true,
  },
  roomtype: {
    type: String,
    require: true,
  },
  checkindate: {
    type: Date,
    require: true,
  },
  checkoutdate: {
    type: Date,
    require: true,
  },
  status :{
    type:String,
    default:"pending"
  },
  date: { type: String,},
  time: {type: String,},
  deletedAt: {type: Date,},
  isDeleted: {type: Boolean,default: false},
},{timestamps:true});

module.exports = mongoose.model("guest", guestSchema)