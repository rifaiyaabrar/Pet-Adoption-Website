const express = require('express')
const router = express.Router()
const Pet = require('../models/pet')
const User = require('../models/user')

router.get('/donatepet', async (req, res) => {
  if (!req.session.username) return res.redirect('/signin')

  const pet = await Pet.find()
  const { username, name, email, phone, nid, } = await User.findOne({ username: req.session.username })

  return res.render('pages/donatepet', {
    username, name, email, phone, nid,
    store: pet,
    is_admin: false,
  })
})
router.post('/donatepet', async (req, res) => {
  if (!req.session.username) return res.redirect('/signin')

  const { pet_name, pet_image, description, catagory } = req.body

  await Pet({ username: req.session.username, pet_name, pet_image, description, catagory }).save()

  return res.redirect('/')
})

module.exports = router
