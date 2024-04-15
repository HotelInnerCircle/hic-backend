const guestModel = require("../models/guestModel")
const moment = require("moment");
require("moment-timezone");

moment.tz.setDefault("Asia/Kolkata");
let dates = moment().format("YYYY-MM-DD");
let times = moment().format("HH:mm:ss");

const guests = async (req,res)=>{
    try {
        let data = req.body
        moment.tz.setDefault("Asia/Kolkata");
        let dates = moment().format("YYYY-MM-DD");
        let times = moment().format("HH:mm:ss");
        data.date = dates;
        data.time = times;
        let saveData = await guestModel.create(data)
        return res.status(201).send({status:true,data:saveData})
    } catch (error) {
        return res.status(500).send({ status: false, message: error.message });
    }
}

const getGuest = async (req,res)=>{
    try {
        let data = await guestModel.find({isDeleted:false})
        if(!data){
            return res.status(404).send({status:false,message:"no data found"})
        }
        return res.status(200).send({status:true,data:data})
    } catch (error) {
        return res.status(500).send({status:false, message:error.message}) 
    }
} 


module.exports = {guests, getGuest}