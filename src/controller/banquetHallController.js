const banquetModel = require("../models/banquetModel")
const moment = require("moment");
require("moment-timezone");

moment.tz.setDefault("Asia/Kolkata");
let dates = moment().format("YYYY-MM-DD");
let times = moment().format("HH:mm:ss");

const banquetHall = async (req,res)=>{
    try {
        let data = req.body
        moment.tz.setDefault("Asia/Kolkata");
        let dates = moment().format("YYYY-MM-DD");
        let times = moment().format("HH:mm:ss");
        data.date = dates;
        data.time = times;
        let saveData = await banquetModel.create(data)
        return res.status(201).send({status:true,data:saveData})
    } catch (error) {
        return res.status(500).send({ status: false, message: error.message });
    }
}
//==================================================================================

const getbanquetHall = async (req,res)=>{
    try {
        let data = await banquetModel.find({isDeleted:false}).sort({createdAt:-1})
        if(!data){
            return res.status(404).send({status:false,message:"no data found"})
        }
        return res.status(200).send({status:true,data:data})
    } catch (error) {
        return res.status(500).send({status:false, message:error.message}) 
    }
} 

//==========================================================================
const updateStatusOfBanquetHall = async (req,res)=>{
    try {
        let banquetHallId = req.params.banquetId
        let data = req.body
        let findBanquet = await banquetModel.find({_id:banquetHallId, isDeleted:false})
        if(!findBanquet){
            return res.status(404).send({status:false,message:"no data found"}) 
        }
        let updateStatus = await banquetModel.findByIdAndUpdate({_id:banquetHallId},data,{new:true})
        return res.status(200).send({status:true,data:updateStatus}) 
    } catch (error) {
        return res.status(500).send({status:false, message:error.message}) 
    }
}

module.exports = {banquetHall, getbanquetHall, updateStatusOfBanquetHall}