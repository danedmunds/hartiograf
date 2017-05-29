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
      name: { type: String },
      coming: { type: Boolean, default: false },
      shuttle: { type: Boolean, default: false },
      diet: { type: String }
    })

    let schema = new mongoose.Schema({
      guests: [ guestSchema ],
      songs: [ String ],
      comments: { type: String }
    })

    schema.methods.update = function (newValue) {
      this.songs = newValue.songs
      this.comments = newValue.comments

      let newGuestsMap = {}
      _.forEach(newValue.guests, (guest) => {
        newGuestsMap[guest.name] = guest
      })

      _.forEach(this.guests, (guest) => {
        let match = newGuestsMap[guest.name]
        if (match) {
          guest.coming = match.coming
          guest.shuttle = match.shuttle
          guest.diet = match.diet
        }
      })
    }

    return schema
  }
}

Rsvp.MODEL_NAME = 'Rsvp'

module.exports = Rsvp
