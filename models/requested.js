const mongoose = require('mongoose')

const requestedSchema = new mongoose.Schema({
  catagory : {
    type     : String,
    required : true,
  },
  items    : [
    {
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

const requested = mongoose.model('requested', requestedSchema)
module.exports = requested
