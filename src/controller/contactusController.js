const contactUsModel = require("../models/contactusModel")

const contactus = async (req,res)=>{
    try {
        let data = req.body
        let saveData = await contactUsModel.create(data)
        return res.status(201).send({status:true,data:saveData})
    } catch (error) {
        return res.status(500).send({status:false, message:error.message})
    }
}

const getContactUs = async (req,res)=>{
    try {
        let data = await contactUsModel.find({isDeleted:false, is_block:false})
        if(!data){
            return res.status(404).send({status:false,message:"no data found"})
        }
        return res.status(200).send({status:true,data:data})
    } catch (error) {
        return res.status(500).send({status:false, message:error.message}) 
    }
}


module.exports = {contactus, getContactUs}