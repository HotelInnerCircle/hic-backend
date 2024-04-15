const mongoose = require('mongoose');


// const isValidFiles = (files) => {
//     if (files && files.length > 0) return true
//   }
  
  const isValidBody = (reqBody) => {
    return Object.keys(reqBody).length === 0;
  }


  const isValidObjectId = (objectId) => {
    return mongoose.Types.ObjectId.isValid(objectId)
    
}

// const isValidimage = (value) => {
//     let imageRegex = /(\/*\.(?:png|gif|webp|jpeg|jpg))/;
//     if (imageRegex.test(value))
//         return true;
// }

module.exports ={isValidBody,isValidObjectId, }