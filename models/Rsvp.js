const mongoose = require('mongoose')
const _ = require('lodash')

class Rsvp {

  createModel () {
    if (mongoose.models[Rsvp.MODEL_NAME]) {
      return mongoose.model(Rsvp.MODEL_NAME)
    }
    return mongoose.model(Rsvp.MODEL_NAME, this.createSchema())
  }

  createSchema() {
    let guestSchema = new mongoose.Schema({
      token: { type: String, index: true, unique: true },
      name: { type: String },
      pos: { type: Number },
      isPlusOne: { type: Boolean, default: false },
      coming: { type: Boolean, default: false },
      shuttle: { type: Boolean, default: false },
      diet: { type: String }
    })

    let visitSchema = new mongoose.Schema({
      page: { type: String },
      date: { type: Date, default: Date.now }
    })
    visitSchema.set('toJSON', {
      transform: doc => {
        return _.pick(doc, ['page', 'date'])
      }
    })

    let schema = new mongoose.Schema({
      guests: [ guestSchema ],
      songs: [ String ],
      comments: { type: String },
      visits: [ visitSchema ]
    })
    schema.set('toJSON', {
      transform: doc => {
        return _.pick(doc, ['guests', 'songs', 'comments', 'visits'])
      }
    })

    schema.statics.findByToken = function(token, next) {
      return this.find({ token }, {visits: 0}, (err, results) => {
        if (!err && results.length > 0) {
          return next(null, results[0])
        }
        next(err, null)
      })
    }

    schema.statics.findAllVisits = function(next) {
      this.find({}, {'guests.name': 1, 'guests.isPlusOne': 1, visits: 1}, (err, result) => {
        if (err) {
          return next(err)
        }
        return next(null, result.map((element) => {
          return {
            guests: element.guests.map((guest) => {
              let name = guest.name
              if (!name && guest.isPlusOne) {
                name = '+1'
              }
              return name
            }).join(', '),
            visits: element.visits.sort((one, two) => {
              // descending by date
              return two.date - one.date
            })
          }
        }))
      })
    }

    schema.methods.update = function (newValue) {
      this.songs = newValue.songs
      this.comments = newValue.comments

      let newGuestsMap = {}
      _.forEach(newValue.guests, (guest) => {
        newGuestsMap[guest.pos] = guest
      })

      _.forEach(this.guests, (guest) => {
        let match = newGuestsMap[guest.pos]
        if (match) {
          if (guest.isPlusOne) {
            guest.name = match.name
          }
          guest.coming = match.coming
          guest.shuttle = match.shuttle
          guest.diet = match.diet
        }
      })
    }

    schema.methods.getVisits = function (next) {
      this.model(Rsvp.MODEL_NAME).find({_id: this._id}, {visits: 1}, (err, result) => {
        if (err) {
          return next(err)
        }
        return next(null, result.visits)
      })
    }

    schema.methods.addVisit = function (page, next) {
      this.model(Rsvp.MODEL_NAME).update({_id: this._id},
        {
          $push: {
            visits: {
              page
            }
          }
        }, (err) => {
        if (err) {
          return next(err)
        }
        return next()
      })
    }

    return schema
  }
}

Rsvp.MODEL_NAME = 'Rsvp'

module.exports = Rsvp
