const router = require('express').Router()

const user = require('../models/user')

router.get('/registration', (req, res) => {
  if (req.session.username) return res.redirect('/')

  res.render('registration', { username: req.session.username })
})
router.post('/registration', async (req, res) => {
  if (req.session.username) return res.redirect('/')

  const { name, username, email, password, phone } = req.body
  console.log(name, username, email, password, phone)

  const userFound = await user.findOne({ username })

  if (userFound) {
    res.render('registration', {
      message : 'User with that email already exists',
      type    : 'danger',
    })
    res.redirect('/registration')
  } else {
    try {
      await new user({
        username,
        name,
        email,
        password,
        phone,
      }).save()

      res.redirect('/signin')
    } catch (error) {
      console.log(error)
      res.render('registration', {
        message : 'Fill all fields',
        type    : 'danger',
      })
      res.redirect('/registration')
      res.redirect('/registration')
    }
  }
})

module.exports = router
