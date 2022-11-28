const router = require('express').Router()

const user = require('../models/user')

router.get('/registration', (req, res) => {
  if (req.session.username) return res.redirect('/')

  return res.render('pages/registration', { username: req.session.username })
})
router.post('/registration', async (req, res) => {
  if (req.session.username) return res.redirect('/')

  const { name, username, email, password, nid, phone } = req.body

  const userFound = await user.findOne({ username })

  if (userFound) {
    return res.render('pages/registration', {
      message: 'User with that email already exists',
      type: 'danger',
    })
  } else {
    try {
      await new user({
        username,
        name,
        email,
        password,
        nid,
        phone,
      }).save()

      return res.redirect('/signin')
    } catch (error) {
      return res.render('pages/registration', {
        message: 'Fill all fields',
        type: 'danger',
      })
    }
  }
})

module.exports = router
