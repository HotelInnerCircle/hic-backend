const feedbackModel = require("../models/feedbacksModel")


const feedback = async (req,res)=>{
    try {
        let data = req.body
        let saveData = await feedbackModel.create(data)
        return res.status(201).send({status:true,data:saveData})
    } catch (error) {
        return res.status(500).send({status:false, message:error.message}) 
    }
}

const getfeedbacks = async (req,res)=>{
    try {
        let data = await feedbackModel.find({isDeleted:false})
        if(!data){
            return res.status(404).send({status:false,message:"no data found"})
        }
        return res.status(200).send({status:true,data:data})
    } catch (error) {
        return res.status(500).send({status:false, message:error.message}) 
    }
} 




module.exports = {feedback , getfeedbacks}