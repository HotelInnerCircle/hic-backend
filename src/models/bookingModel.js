const mongoose = require("mongoose");
const moment = require("moment");
require("moment-timezone");

moment.tz.setDefault("Asia/Kolkata");
let dates = moment().format("YYYY-MM-DD");
let times = moment().format("HH:mm:ss");
const bookingSchema = new mongoose.Schema(
  {
    roomType: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "rooms",
      required: true,
    },
    totalRooms: {
      type: Number,
      default: 50,
    },
    noOfRoomsAvailable: {
      type: Number,
      default: 50,
    },
    notAvailableRooms: {
      type: Number,
      default: 0,
    },
    is_Available: {
      type: Boolean,
      default: true,
    },
    // bookedDate: {
    //   type: Date,
    // },
    bookedDate: {
      type: Date,
      required: true,
    //   default: dates,
    },
   
    deletedAt: {
      type: Date,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("booking", bookingSchema);
