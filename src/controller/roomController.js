
const roomModel = require("../models/roomsModel")

const createRooms = async(req,res)=>{
try {
    let data = req.body
    let saveData = await roomModel.create(data)
    return res.status(201).send({status:true,data:saveData})
} catch (error) {
    return res.status(500).send({status:false, message:error.message})
}


}

// const addRoom = (async (req, res) => {
//     try {
//         const { input } = req.params
//         const parseInput = parseInt(input)
//         const roomId = req.session.ROOMID
//         const room = await roomModel.findById(roomId)

//         for (let i = 0; i < parseInput; i++) {
//             let roomNo = 1
//             roomNo += room.availableRooms.length

//             let newRoom = {
//                 roomNo,
//             }
//             room.availableRooms.push(newRoom)
//         }
//         room.noOfRooms += parseInput
//         room.save()

//         return res.status(200).end()
//     } catch (error) {
//         return res.status(500).end()
//     }
// })


// const getRooms = async (req,res)=>{
//     try {
//         let getdata = await roomModel.find()
//         return res.status(200).send({status:true,data:getdata})
//     } catch (error) {
//         return res.status(500).send({status:false, message:error.message}) 
//     }
// }

let updateRooms = async (req,res)=>{
    try {
        let queries = req.query.roomID
        let data = req.body
        let getrooms =  await roomModel.findById({_id:queries})
        if(!getrooms){
            return res.status(404).send({status:false,message:"no room present"})
        }
        let updatedRoom= await roomModel.findByIdAndUpdate({_id:queries}, data, {new:true})
       
        return res.status(200).send({status:true,data:updatedRoom})
    } catch (error) {
        return res.status(500).send({status:false, message:error.message}) 
    }
}


const getRooms = async(req,res)=>{
    try {
        let data = await roomModel.find({isDeleted:false, is_block:false})
        if(!data){
            return res.status(404).send({status:false,message:"no data found"})
        }
        return res.status(200).send({status:true,data:data})
    } catch (error) {
        return res.status(500).send({status:false, message:error.message}) 
    }
}



module.exports= {
    createRooms ,
    getRooms,
    updateRooms , 
    //   addRoom
    }