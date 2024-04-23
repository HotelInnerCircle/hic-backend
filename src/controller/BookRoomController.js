const mongoose = require("mongoose")
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
      return res.status(404).send({
        status: false,
        message: "available rooms should be less than total rooms",
      });
    }
    data.notAvailableRooms = data.totalRooms - data.noOfRoomsAvailable;
    if (data.noOfRoomsAvailable <= 0) {
      data.is_Available = false;
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
    let data = req.body;

    let check_bookingID_exist = await bookingModel.findOne({ _id: bookingID });

    if (!check_bookingID_exist) {
      return res.status(404).send({ status: false, message: "Booking ID not found" });
    } else {
      // If noOfRoomsAvailable is provided in the request body, update it and adjust notAvailableRooms and is_Available accordingly
      if (data.noOfRoomsAvailable !== undefined) {
        let totalRooms = check_bookingID_exist.totalRooms;
        let noOfRoomsAvailable = data.noOfRoomsAvailable;

        // If noOfRoomsAvailable exceeds totalRooms, set it to totalRooms
        if (noOfRoomsAvailable > totalRooms) {
          return res.status(400).send({ status: false, message: "available rooms are greater than total" });
        }

        // If noOfRoomsAvailable equals totalRooms, set notAvailableRooms to 0 and is_Available to false
        let notAvailableRooms = 0;
        let isAvailable = true;
        if (noOfRoomsAvailable === 0) {
          notAvailableRooms = 0;
          isAvailable = false;
        } else {
          notAvailableRooms = totalRooms - noOfRoomsAvailable;
        }

        // Update the booking with the new values
        let find_booking = await bookingModel.findByIdAndUpdate(
          { _id: bookingID },
          {
            noOfRoomsAvailable: noOfRoomsAvailable,
            notAvailableRooms: notAvailableRooms,
            is_Available: isAvailable,
            totalRooms: data.totalRooms,
          },
          { new: true }
        );

        return res.status(200).send({ status: true, data: find_booking });
      }
      //  else {
      //   // If noOfRoomsAvailable is not provided in the request body, simply update the bookedRoomsNumber
      //   let find_booking = await bookingModel.findByIdAndUpdate(
      //     { _id: bookingID },
      //     { totalRooms: data.totalRooms },
      //     { new: true }
      //   );

      //   return res.status(200).send({ status: true, data: find_booking });
      // }
    }
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
};


const getBookedRooms = async (req, res) => {
  try {
    filter = { isDeleted: false, is_Available: true };
    getdata = await bookingModel.find(filter).sort({createdAt:-1});
    return res.status(200).send({ status: true, data: getdata });
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
};

const getBookedroomBydate = async (req, res) => {
  try {
    let { checkIn, checkOut, room } = req.query;

    // Check if the required parameters are provided
    if (!checkIn || !checkOut) {
      return res.status(400).send({ status: false, message: "Please provide check-in and check-out dates" });
    }

    // Convert checkIn and checkOut strings to Date objects
    checkIn = new Date(checkIn);
    checkOut = new Date(checkOut);
    // Array to hold dates within the specified range
    const datesInRange = [];
    let currentDate = new Date(checkIn);
    while (currentDate <= checkOut) {
      datesInRange.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1); // Move to the next day
    }
   // Find bookings within each date in the range
const availability = await Promise.all(
  datesInRange.map(async (date) => {
    let query = { bookedDate: date };
    if (room) {
      query.roomType = room;
    }
    // query.noOfRoomsAvailable = { $gt: 0 };
    const bookings = await bookingModel.find(query);
    return { date, bookings };
  })
);

// Check if rooms are available for each date
const isAvailable = availability.every(({ date, bookings }, index) => {
  // If there are no bookings for the date, consider all rooms available
  if (bookings.length === 0) {
    // Update the existing entry in the array with the message
    availability[index] = { date, message: "All rooms are available." };
    return true;
  }
  console.log(bookings);
  // If room parameter is not provided, sum up available rooms for all room types
  const totalAvailableRoomsForDate = bookings.reduce(
    (total, booking) => {
      // Check if the booking is deleted, if so, mark it as not available
      if (booking.isDeleted) {
        // console.log('Booking is deleted:', booking);
        return total;
      }
      return total + booking.noOfRoomsAvailable;
    },
    0
  );
  return totalAvailableRoomsForDate > 0;
});


    if (!isAvailable) {
      return res
        .status(404)
        .send({ status: false,isAvailable:false, message: "Rooms are not available for the specified dates" });
    }

    return res.status(200).send({ status: true,isAvailable:true, message: "Rooms are available", data: availability });
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
};


const deleteBooking = async (req,res)=>{
  try {
    let bookingID = req.params.bookingID;
    // let data = req.body;

    let check_bookingID_exist = await bookingModel.findOne({ _id: bookingID });

    if (!check_bookingID_exist) {
      return res.status(404).send({ status: false, message: "Booking ID not found" });
    } 
    if(check_bookingID_exist.isDeleted==true){
      return res.status(404).send({ status: false, message: "already deleted" });
    }
   await bookingModel.findByIdAndUpdate({_id: bookingID},{ isDeleted: true, deletedAt: Date.now() })
    return res.status(200).send({ status: true, message: "Deleted Successfully" })
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
}

//================================================================================

const getbookedRoomsByroomType = async (req,res)=>{
  try {
    
    let bookedroom = req.params.room
    let data = await bookingModel.find({roomType:bookedroom, isDeleted:false})
    if(!data){
      return res.status(404).send({status:false, message:"data not found"})
    }
    return res.status(200).send({status:true, data:data})
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
}

module.exports = {
  bookedRooms,
  updateBookings,
  getBookedRooms,
  getBookedroomBydate,
  deleteBooking,
  getbookedRoomsByroomType
};
