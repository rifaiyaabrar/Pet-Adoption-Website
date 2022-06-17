const { clearCache } = require('ejs')
const express = require('express')
const user = require('../models/user')

const router = express.Router()

router.get('/signin', (req, res) => {
  if (req.session.username) return res.redirect('/')
  res.render('signin', { username: req.session.username })
})

router.post('/signin', async (req, res) => {
  const { username, password } = req.body

  const userFound = await user.findOne({ username })
  if (!userFound) {
    res.render('signin', {
      message : 'Username/Password do not match',
      type    : 'danger',
    })
  } else {
    user.find({ username }).then(users => {
      users.forEach(user => {
        if (username === user.username && password === user.password) {
          console.log(user.username)
          //initiating session
          req.session.username = user.username
          req.session.is_admin = user.is_admin

          res.redirect('/')
        } else {
          res.render('signin', {
            message : 'Username/Password do not match',
            type    : 'danger',
          })
        }
      })
    })
  }
})

module.exports = router
