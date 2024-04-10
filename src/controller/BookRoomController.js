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
    if (data.notAvailableRooms <= 0) {
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

const getBookedRooms = async (req, res) => {
  try {
    filter = { isDeleted: false, is_Available: true };
    getdata = await bookingModel.find(filter);
    return res.status(200).send({ status: true, data: getdata });
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
};

const getBookedroomBydate = async (req, res) => {
  try {
    let { checkIn, checkOut, room } = req.query;

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
        const bookings = await bookingModel.find({
          bookedDate: date,
          roomType: room
        });
        return { date, bookings };
      })
    );

    // console.log("Availability:", availability);

    // Check if rooms are available for each date
    const isAvailable = availability.every(({ date, bookings }) => {
      // If there are no bookings for the date, consider all rooms available
      if (bookings.length === 0) {
        return true;
      }
      
      const totalAvailableRoomsForDate = bookings.reduce(
        (total, booking) => total + booking.noOfRoomsAvailable,
        0
      );
      return totalAvailableRoomsForDate > 0;
    });

    if (!isAvailable) {
      return res
        .status(404)
        .send({ status: false, message: "Rooms are not available for the specified dates" });
    }

    return res.status(200).send({ status: true, message: "Rooms are available for the specified dates" });
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
};



module.exports = {
  bookedRooms,
  updateBookings,
  getBookedRooms,
  getBookedroomBydate,
};
