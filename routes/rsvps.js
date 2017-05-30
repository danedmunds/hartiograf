const express = require('express')
const _ = require('lodash')
const bodyParser = require('body-parser')

const verifyToken = require('../tokens/verifyToken')
const Rsvp = require('../models/Rsvp')

class RsvpsRouter {

  constructor(mailService) {
    this.router = express.Router()
    this.rsvpModel = new Rsvp().createModel()
    this.mailService = mailService
  }

  initRoutes() {
    this.router.use(bodyParser.json())
    this.router.route('/:id')
      .get(this.attachRsvpToReq.bind(this), this.getRsvp.bind(this))
      .put(this.attachRsvpToReq.bind(this), this.putRsvp.bind(this))
  }

  attachRsvpToReq(req, res, next) {
    let id = req.params.id
    if (!id) {
      return res.sendStatus(400)
    }

    this.rsvpModel.findById(id, (err, rsvp) => {
      if (err) {
        return next(err)
      }

      if (!rsvp) {
      // if (!rsvp || !verifyToken(req.token, rsvp.id)) {
        return res.sendStatus(404)
      }

      req.rsvp = rsvp
      next()
    })
  }

  getRsvp(req, res, next) {
    res.send(req.rsvp)
  }

  putRsvp(req, res, next) {
    let rsvp = req.rsvp
    rsvp.update(req.body)
    rsvp.save((err, rsvp) => {
      if (err) {
        return next(err)
      }

      // async with no callback, don't care if it fails
      this.mailService.sendRsvpEmail(rsvp)
      res.send(rsvp)
    })
  }
}

module.exports = RsvpsRouter
