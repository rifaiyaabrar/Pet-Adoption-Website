const express = require('express')

let router = express.Router()

router.get('/donationVerifications', (req, res) => {
  if (!req.session.username) return res.redirect('/signin')

  res.render('donationVerifications', { username: req.session.username, is_admin: true })
})
module.exports = router
