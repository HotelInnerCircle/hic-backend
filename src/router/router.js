const express = require("express");
let router = express.Router();
const { register, login } = require("../controller/usercontoller");

const {
  createRooms,
  getRooms,
  updateRooms,
} = require("../controller/roomController");

const {
  // createRoom,
  createBooking,
  updateBookings,
} = require("../controller/BookRoomController");

router.get("/test-me", function (req, res) {
  res.send("this is successfully created");
});
//===================================================================

router.post("/register", register);
router.post("/login", login);

//======================================================================

// router.post("/createrooms", createRooms)
router.post("/createRooms", createRooms);
router.get("/getRooms", getRooms);
router.put("/updateRooms", updateRooms);

router.post("/createBooking", createBooking);
router.put("/updateBookings/:bookingID", updateBookings);

module.exports = router;

//https://github.com/SagarBhatia0105/roombooking-app/blob/master/routes/room.js
