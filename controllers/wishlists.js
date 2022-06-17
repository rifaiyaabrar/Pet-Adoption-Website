const express = require('express')

let router = express.Router()

router.get('/wishlists', (req, res) => {
  if (!req.session.username) return res.redirect('/signin')

  res.render('wishlists', { username: req.session.username, is_admin: true })
})
module.exports = router
