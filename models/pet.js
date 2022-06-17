const mongoose = require('mongoose')

const petSchema = new mongoose.Schema({
  catagory : {
    type     : String,
    required : true,
  },
  items    : [
    {
      image       : {
        type    : String,
        default : '',
      },
      name        : {
        type     : String,
        required : true,
      },
      description : {
        type    : String,
        default : '',
      },
      Breed : {
        type    : String,
        required : true,
      },
      Requirements : {
        type    : String,
        default : '',
      },
    },
  ],
})

const pet = mongoose.model('pet', petSchema)
module.exports = pet
