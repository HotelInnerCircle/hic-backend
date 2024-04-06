- In the website user will only checks the room is available or not( as per client requirement)
- user can give feedbacks
- user can contact us use

### Models

- user
- rooms
- bookedrooms

## rooms

In rooms basic details will be there of the rooms

## booked rooms

In this only perticular day of perticular room total, no of rooms avalability will be there

# rooms

{
description:{string} <br>
price :{string} <br>
adults :{string} <br>
children :{string} <br>
bed :{string} <br>
amenities :{string} <br>
is_block :{boolean} <br>
discountPrice :{number} <br>
discount :{number} <br>
deletedAt :{boolean} <br>
isDeleted:{boolean} <br>
date:{string} <br>
time:{string} <br>
}

## rooms apis

#### POST / createRooms

- created rooms with request body
- save it is the database

* Response format

- On success - Return HTTP status 201. Also return the popup document. The response should be a JSON object
- On error - Return a suitable error message with a valid HTTP status code. The response should be a JSON object

#### GET / getrooms

- return all the rooms which are available

* Response format

- On success - Return HTTP status 201. Also return the popup document. The response should be a JSON object
- On error - Return a suitable error message with a valid HTTP status code. The response should be a JSON object

#### PUT / updaterooms/:roomID


Updates a rooms by changing at least one or all fields (specifically the price)
Check if the roomID exists (must have isDeleted false and is present in collection). If it doesn't, return an HTTP status 404 with a response body

- Response format

* On success - Return HTTP status 200. Also return the updated vehicle document. The response should be a JSON object
* On error - Return a suitable error message with a valid HTTP status code. The response should be a JSON object




## Booked Rooms apis

{
    RoomType: {ObjectId, refs to rooms, mandatory, unique}, <br>
    totalRooms : {type: Number} <br>
    noOfRoomsAvailable:{type:Number} <br>
    bookedRoomsNumber: {type:Number} <br>
    is_Available : {Boolean } <br>
    date: {type:Date} <br>
    time: {type:time} <br>
    deletedAt:{type:Date} <br>
    isDeleted: {type:Boolean} <br>
}

#### POST / bookedRooms
In this api admin will give the info of no.of rooms available on  a perticular date

- created rooms with request body
- save it is the database

* Response format

- On success - Return HTTP status 201. Also return the popup document. The response should be a JSON object
- On error - Return a suitable error message with a valid HTTP status code. The response should be a JSON object


#### GET / getBookrooms

- return all the rooms which are available form given date range and no.of rooms required accordingly

* Response format

- On success - Return HTTP status 201. Also return the popup document. The response should be a JSON object
- On error - Return a suitable error message with a valid HTTP status code. The response should be a JSON object

#### GET / roomsNotAvailable

- return all the rooms which are not available form given date range and no.of rooms required accordingly

* Response format

- On success - Return HTTP status 201. Also return the popup document. The response should be a JSON object
- On error - Return a suitable error message with a valid HTTP status code. The response should be a JSON object




#### PUT / bookrooms/:bookedID

Updates a bookedroom by changing at least one or all fields 
Check if the bookedroomID exists (must have isDeleted false and is present in collection). If it doesn't, return an HTTP status 404 with a response body

- Response format

* On success - Return HTTP status 200. Also return the updated vehicle document. The response should be a JSON object
* On error - Return a suitable error message with a valid HTTP status code. The response should be a JSON object

#### DELETE / bookroom/:bookedId

Deletes a bookroom by vehicle id if it's not already deleted

- Response format

* On success - Return HTTP status 200. The response should be a JSON object
* On error - Return a suitable error message with a valid HTTP status code. The response should be a JSON object

- ## user
  {
  name :{string}
  phone :{number}
  email:{string}
  password:{string}
  }

#### POST /register

- Create a user document from request body. Request body must contain image.
  -Save password in encrypted format. (use bcrypt)

* Response format

- On success - Return HTTP status 201. Also return the user document. The response should be a JSON object
- On error - Return a suitable error message with a valid HTTP status code. The response should be a JSON object

#### POST /login

- Allow an user to login with their email and password.
- On a successful login attempt return the userId and a JWT token contatining the userId, exp, iat.
  NOTE: There is a slight change in response body. You should also return userId in addition to the JWT token.

* Response format

- On success - Return HTTP status 200 and JWT token in response body. The response should be a JSON object
- On error - Return a suitable error message with a valid HTTP status code. The response should be a JSON object

