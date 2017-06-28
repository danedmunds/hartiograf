const express = require('express')
const _ = require('lodash')
const bodyParser = require('body-parser')

const verifyToken = require('../tokens/verifyToken')
const Rsvp = require('../models/Rsvp')

class VisitsRouter {

  constructor(authorization) {
    this.router = express.Router()
    this.rsvpModel = new Rsvp().createModel()
    this.authorization = authorization
  }

  initRoutes() {
    this.router.use(bodyParser.json())
    this.router.route('/')
      .get(this.getAllVisits.bind(this))
  }

  getAllVisits(req, res, next) {
    if (req.get('Authorization') !== 'Basic ' + this.authorization) {
      return res.sendStatus(401)
    }

    this.rsvpModel.findAllVisits((err, visits) => {
      if (err) {
        return next(err)
      }

      res.send(visits)
    })
  }
}

module.exports = VisitsRouter
