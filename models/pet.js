const mongoose = require('mongoose')

const petSchema = new mongoose.Schema({
  username: {
    type: String,
    default: '',
  },
  pet_name: {
    type: String,
    default: '',
  },
  pet_image: {
    type: String,
    default: '',
  },
  description: {
    type: String,
    default: '',
  },
  catagory: {
    type: String,
    default: '',
  },
  status: {
    type: String,
    default: 'Pending',
  },
  donated_to: {
    type: String
  },
  request: [
    {
      type: String,
    }
  ]
})

const pet = mongoose.model('pet', petSchema)
module.exports = pet
