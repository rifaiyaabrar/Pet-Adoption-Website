const express = require('express')
const path = require('path')
const mongoose = require('mongoose')
const routes = require('./controllers')

const session = require('express-session')
const app = express()

app.use(
  session({
    secret: '3CWF-rrZ3-WRxAQ378',
    resave: true,
    saveUninitialized: true,
  })
)

app.use(express.static(path.join(__dirname, '/public')))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.set('view engine', 'ejs')

//Routing
routes.map(route => app.use(route))

//server start
mongoose
  .connect('mongodb://localhost:27017/petSocietyDB', {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => {
    app.listen(5000, () => {
      console.log('Server is running on Port 5000')
    })
  })

mongoose.connection.on('open', () => {
  console.log('Database connected')
})
