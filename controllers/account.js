const express = require('express')

let router = express.Router()

router.get('/accountDetails', (req, res) => {
  if (!req.session.username) return res.redirect('/signin')

  res.render('accountDetails', { username: req.session.username, is_admin: false })
})
module.exports = router
