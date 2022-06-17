const mongoose = require('mongoose')

const donatedSchema = new mongoose.Schema({
  product_id : {
    type     : mongoose.Types.ObjectId,
    required : true,
  },
  name       : {
    type     : String,
    required : true,
  },
  is_verified : {
    type     : Boolean,
    default  : false,
    required : true,
  },
})

const donated = mongoose.model('donated', donatedSchema)
module.exports = donated
