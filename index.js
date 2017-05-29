const express = require('express')
const cookieParser = require('cookie-parser')
const http = require('http')
const mongoose = require('mongoose')
require('dotenv').config()

const RsvpsRouter = require('./routes/rsvps')

const port = process.env.PORT
mongoose.connect(process.env.CONNECTIONSTRING)

let app = express()

app.use(express.static('client'))
app.use(cookieParser())
app.use((req, res, next) => {
  let token = req.query.token || req.cookies.token
  if (!token) {
    res.sendStatus(401)
  }
  req.token = token
  res.cookie('token', token);
  next()
})

let rsvpsRouter = new RsvpsRouter()
rsvpsRouter.initRoutes()
app.use('/api/v1/rsvps', rsvpsRouter.router)

let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  var server = http.createServer(app)
  server.listen(port, () => {
    console.log(`Listening on ${port}`)
  })
});
