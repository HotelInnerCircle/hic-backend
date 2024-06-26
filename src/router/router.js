const express = require("express");
let router = express.Router();
const { register, login } = require("../controller/usercontoller");

const {
  createRooms,
  getRooms,
  updateRooms,
  getroomPrice
} = require("../controller/roomController");

const {
  bookedRooms,
  updateBookings,
  getBookedRooms,
  getBookedroomBydate,
  deleteBooking,
  getbookedRoomsByroomType
} = require("../controller/BookRoomController");

const {
  contactus,
  getContactUs,
} = require("../controller/contactusController");

const { feedback, getfeedbacks } = require("../controller/feedbackController");

const {guests, getGuest , updateStatus} = require("../controller/guestController")

const {banquetHall, getbanquetHall, updateStatusOfBanquetHall} = require("../controller/banquetHallController")

const {authentication,authorization} = require("../middleware/auth")

//=====================================================================
router.get("/test-me", function (req, res) {
  res.send("this is successfully created");
});
//===================================================================

router.post("/register", register);
router.post("/login", login);

//======================================================================

// router.post("/createrooms", createRooms)
router.post("/createRooms/:userId",authentication,authorization, createRooms); // by admin
router.get("/getRooms/:userId",authentication,authorization, getRooms); // by admin
router.get("/getroomPrice",getroomPrice)
router.put("/updateRooms/:userId",authentication,authorization, updateRooms); // by admin
//=======================================================================
router.post("/bookedRooms/:userId",authentication,authorization, bookedRooms); // by admin
router.put("/updateBookings/:bookingID/:userId",authentication,authorization, updateBookings); // by admin
router.get("/getBookedRooms", getBookedRooms);
router.get("/getBookedroomBydate", getBookedroomBydate);
router.delete("/deleteBooking/:bookingID/:userId", authentication,authorization,deleteBooking); // by admin
router.get("/getbookedRoomsByroomType/:room",getbookedRoomsByroomType)
//========================================================================
router.post("/contactus", contactus);
router.get("/getContactUs/:userId", authentication,authorization,getContactUs); // by admin
//=======================================================================

router.post("/feedback", feedback);
router.get("/getfeedbacks/:userId", authentication,authorization,getfeedbacks); // by admin

//========================================================================

router.post("/guests", guests)
router.get("/getGuest/:userId",authentication,authorization,getGuest)
router.put("/updateStatus/:guestId/:userId",authentication,authorization,updateStatus)
//=======================================================================
router.post("/banquetHall",banquetHall)
router.get("/getbanquetHall/:userId",authentication,authorization,getbanquetHall)
router.put("/updateStatusOfBanquetHall/:banquetId/:userId",authentication,authorization,updateStatusOfBanquetHall)

//========================================================================

module.exports = router;

