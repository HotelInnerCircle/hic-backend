
const moment = require("moment");
require("moment-timezone");

moment.tz.setDefault("Asia/Kolkata");

const roomModel = require("../models/roomsModel");
const bookingModel = require("../models/bookingModel");

// const bookedRooms = async (req, res) => {
//   try {
//     let data = req.body;
//     let saveData = await roomModel.create(data);
//     res.status(201).send({ status: true, data: saveData });
//   } catch (error) {
//     return res.status(500).send({ status: false, message: error.message });
//   }
// }; 

const bookedRooms = async (req, res) => {
  try {
    let data = req.body;
    let room_id = data.roomType;
    let find_the_room = await roomModel.findById({ _id: room_id });
    if (!find_the_room) {
      return res
        .status(404)
        .send({ status: false, message: "no room is present" });
    }
    if (data.noOfRoomsAvailable > data.totalRooms) {
      return res
        .status(404)
        .send({
          status: false,
          message: "available rooms should be less than total rooms",
        });
    }
    data.notAvailableRooms= data.totalRooms-data.noOfRoomsAvailable
    if(data.notAvailableRooms<=0){
      data.is_Available = false
    }
    // data.bookedDate = moment(data.bookedDate).format("YYYY-MM-DD");
    let saveData = await bookingModel.create(data);
    return res.status(201).send({ status: true, data: saveData });
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
};

const updateBookings = async (req, res) => {
  try {
    let bookingID = req.params.bookingID;
    // let booked_date = req.params.bookedDate
    let data = req.body;
    // let find_the_room = await roomModel.findById({ _id: data.roomID });
    // if (!find_the_room) {
    //   return res
    //     .status(404)
    //     .findById({ status: false, message: "no room is present" });
    // }
    let check_bookingID_exist = await bookingModel.findOne({ _id: bookingID });

    if (!check_bookingID_exist) {
      return res.status(201).send({ status: false, message: "no booking id" });
    } else {
      let find_booking = await bookingModel.findByIdAndUpdate(
        { _id: bookingID },
        {
          noOfRoomsAvailable: data.noOfRoomsAvailable,
          bookedRoomsNumber: data.bookedRoomsNumber,
        },
        { new: true }
      );

      return res.status(200).send({ status: true, data: find_booking });
    }
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
};

const getBookedRooms = async (req,res)=>{
  try {
    filter = {isDeleted:false,is_Available:true}
    getdata = await bookingModel.find(filter)
    return res.status(200).send({ status: true, data: getdata });
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
}

const getBookedroomBydate = async (req, res) => {
  try {
     let { checkIn, checkOut } = req.query;
 
     // Convert checkIn and checkOut strings to Date objects
     checkIn = new Date(checkIn);
     checkOut = new Date(checkOut);
 
     // Find bookings within the date range
     const filteredBookings = await bookingModel.find({
       bookedDate: {
         $gte: checkIn.toISOString().slice(0, 10),
         $lte: checkOut.toISOString().slice(0, 10)
       },
       isDeleted:false,
       is_Available:true
     });
 
     // Group bookings by roomType and calculate available rooms
     const roomTypeAvailability = {};
     filteredBookings.forEach(booking => {
       if (!roomTypeAvailability[booking.roomType]) {
         roomTypeAvailability[booking.roomType] = {
           totalRooms: booking.totalRooms,
           bookedRooms: 0
         };
       }
       roomTypeAvailability[booking.roomType].bookedRooms += booking.noOfRoomsAvailable;
     });
 
     // Determine if rooms are available
     const roomsAvailable = Object.values(roomTypeAvailability).every(roomType => {
       return roomType.totalRooms - roomType.bookedRooms > 0;
     });
 
     if (!roomsAvailable) {
       return res.status(404).send({ status: false, message: "Rooms are not available" });
     }
     if(filteredBookings.length==0){
            return res.status(200).send({ status: false, message: "All Rooms are available" });
     }
 
     return res.status(200).send({ status: true, data: filteredBookings });
  } catch (error) {
     return res.status(500).send({ status: false, message: error.message });
  }
 };
 

module.exports = { bookedRooms, updateBookings, getBookedRooms, getBookedroomBydate };
