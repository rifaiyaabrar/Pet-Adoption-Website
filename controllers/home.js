const express = require('express')
const router = express.Router()
const Pet = require('../models/pet')

router.get('/', (req, res) => res.redirect('/home'))

router.get('/home', async (req, res) => {
  if (!req.session.username) return res.redirect('/signin')
  let { catagory } = req.query

  let pet
  if (catagory && catagory !== 'All') {
    pet = await Pet.find({ catagory, username: { $ne: req.session.username }, request: { $nin: req.session.username }, status: 'Approved' })
  } else {
    pet = await Pet.find({ username: { $ne: req.session.username }, request: { $nin: req.session.username }, status: 'Approved' })
  }
  if (!catagory) catagory = "All"

  return res.render('pages/home', {
    username: req.session.username,
    is_admin: req.session.is_admin,
    store: pet,
    catagory,
  })
})

module.exports = router
