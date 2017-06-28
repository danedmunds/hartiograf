const express = require('express')
const cookieParser = require('cookie-parser')
const http = require('http')
const mongoose = require('mongoose')
const MailService = require('./services/mail')
require('dotenv').config()

const RsvpsRouter = require('./routes/rsvps')
const VisitsRouter = require('./routes/visits')

const port = process.env.PORT
mongoose.connect(process.env.CONNECTIONSTRING)

let mailService = new MailService(
  {
    apiKey: process.env.MAILGUN_API_KEY,
    domain: process.env.MAILGUN_DOMAIN
  },
  process.env.EMAIL_FROM,
  process.env.EMAIL_TO)

let app = express()

app.use(express.static('client'))
app.use(cookieParser())

let rsvpsRouter = new RsvpsRouter(mailService)
rsvpsRouter.initRoutes()
app.use('/api/v1/rsvps', rsvpsRouter.router)

let visitsRouter = new VisitsRouter(process.env.AUTHORIZATION)
visitsRouter.initRoutes()
app.use('/api/v1/visits', visitsRouter.router)

let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  var server = http.createServer(app)
  server.listen(port, () => {
    console.log(`Listening on ${port}`)
  })
});
