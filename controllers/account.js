const express = require('express')
const Pet = require('../models/pet')
const User = require('../models/user')


let router = express.Router()

router.get('/accountDetails', async (req, res) => {
  if (!req.session.username) return res.redirect('/signin')
  const username = req.session.username

  const user = await User.findOne({ username, })

  return res.render('pages/accountDetails', { username: req.session.username, is_admin: false, user })
})
router.get('/donationApprovals', async (req, res) => {
  if (!req.session.username) return res.redirect('/signin')
  const username = req.session.username

  const request = await Pet.find({ request: { $in: username }, })
  const accepted = await Pet.find({ donated_to: username })

  return res.render('pages/donationApprovals', { username: req.session.username, is_admin: false, request, accepted })
})


module.exports = router
