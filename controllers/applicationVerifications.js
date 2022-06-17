const express = require('express')

let router = express.Router()

router.get('/applicationVerifications', (req, res) => {
  if (!req.session.username) return res.redirect('/signin')

  res.render('applicationVerifications', { username: req.session.username, is_admin: true })
})
module.exports = router
