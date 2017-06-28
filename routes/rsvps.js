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
    this.router.route('/:token')
      .get(this.attachRsvpToReq.bind(this), this.getRsvp.bind(this))
      .put(this.attachRsvpToReq.bind(this), this.putRsvp.bind(this))
    this.router.route('/:token/visits')
      .get(this.attachRsvpToReq.bind(this), this.getVisits.bind(this))
      .post(this.attachRsvpToReq.bind(this), this.addVisit.bind(this))
  }

  attachRsvpToReq(req, res, next) {
    let token = req.params.token
    if (!token) {
      return res.sendStatus(400)
    }

    this.rsvpModel.findByToken(token, (err, rsvp) => {
      if (err) {
        return next(err)
      }

      if (!rsvp) {
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

  getVisits(req, res, next) {
    let rsvp = req.rsvp
    rsvp.getVisits((err, visits) => {
      if (err) {
        return next(err)
      }

      res.send(visits)
    })
  }

  addVisit(req, res, next) {
    let rsvp = req.rsvp
    rsvp.addVisit(req.body.page, (err) => {
      if (err) {
        return next(err)
      }

      res.sendStatus(201)
    })
  }
}

module.exports = RsvpsRouter
