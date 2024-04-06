const roomModel = require("../models/roomsModel");
const bookingModel = require("../models/bookingModel");

const createRoom = async (req, res) => {
  try {
    let data = req.body;
    let saveData = await roomModel.create(data);
    res.status(201).send({ status: true, data: saveData });
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
};



const createBooking = async (req,res)=>{
    try {
        let data = req.body;
        let room_id = data.RoomType
    let find_the_room = await roomModel.findById({ _id: room_id });
    if (!find_the_room) {
      return res
        .status(404)
        .findById({ status: false, message: "no room is present" });
    }
    let saveData = await bookingModel.create(data);
    return res.status(201).send({ status: true, data: saveData });
    } catch (error) {
        return res.status(500).send({ status: false, message: error.message });
    }
}


const updateBookings = async (req, res) => {
  try {
    let bookingID = req.params.bookingID
    // let booked_date = req.params.bookedDate
    let data = req.body;
    // let find_the_room = await roomModel.findById({ _id: data.roomID });
    // if (!find_the_room) {
    //   return res
    //     .status(404)
    //     .findById({ status: false, message: "no room is present" });
    // }
    let check_bookedDate_with_roomID = await bookingModel.findOne({_id:bookingID });

    if (!check_bookedDate_with_roomID) {
      return res.status(201).send({ status: false , message:"no booking id" });
    } 
    else {
      let find_booking = await bookingModel.findByIdAndUpdate(
        { _id: bookingID },
        {
          noOfRoomsAvailable: data.noOfRoomsAvailable,
          bookedRoomsNumber: data.bookedRoomsNumber,
        },
        { new: true }
      );

      return res.status(200).send({status:true,data:find_booking})
    }
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
};
module.exports = { createRoom , createBooking,updateBookings};