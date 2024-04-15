const jwt = require("jsonwebtoken")
const dotenv = require('dotenv'); // Import dotenv
dotenv.config(); 
const userModel = require("../models/userModel")
const mongoose = require("mongoose");
const {isValidBody,isValidObjectId} = require("../validation/validator")

const authentication = async function (req, res, next) {
    try {
        let token = req.headers["authorization"]
        if (!token) { return res.status(401).send({ message: "required token" }) }
        let splittoken = token.split(' ') //converting into array
        // decoding token  
        jwt.verify(splittoken[1], process.env.Secret
            , (err, decoded) => {
                if (err) {
                    return res
                        .status(401)
                        .send({ status: false, message: err.message });
                } else {
                    req.decoded = decoded;
                    next();
                }
            })
    } catch (error) {
        res.status(500).send({ status: false, message: err.message })
    }
}


const authorization = async function (req, res, next) {
    try {
        let userId = req.params.userId
        if (!isValidObjectId(userId)) {
            return res.status(400).send({ status: false, message: "invalid user Id" })
        }
        const user = await userModel.findById(userId)
        if (!user) {
            return res.status(404).send({ status: false, message: "User Not Found" })
        }
        let decoded = req.decoded.userID
        if (userId !== decoded) { return res.status(403).send({ staus: false, msg: "you are not authorized" }) }
        next()
    } catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }

}
module.exports = {authentication,authorization}