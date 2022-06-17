const express = require('express')

let router = express.Router()

router.get('/adoptionApprovals', (req, res) => {
  if (!req.session.username) return res.redirect('/signin')

  res.render('adoptionApprovals', { username: req.session.username, is_admin: false })
})
module.exports = router
