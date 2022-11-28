const express = require('express')

let router = express.Router()

router.get('/signout', (req, res) => {
  if (req.session.username)
    return req.session.destroy(err => {
      if (err) return console.log(err)
      return res.redirect('/')
    })
  else return res.redirect('/signin')
})
module.exports = router
