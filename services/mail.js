var mailgun = require('mailgun-js')
const _ = require('lodash')

class MailService {
  constructor (mailgunConfig, fromEmail, toEmail) {
    this.mailer = mailgun(mailgunConfig)
    this.fromEmail = fromEmail
    this.toEmail = toEmail
  }

  sendRsvpEmail(rsvp, callback) {
    callback = callback || function () {}

    let names = _.join(_.map(rsvp.guests, guest => guest.name), ', ')

    let body = ''
    rsvp.guests.forEach(guest => {
      body += `${guest.name}\n`
      body += `Coming: ${guest.coming ? 'yes' : 'no'}\n`
      body += `Using Shuttle: ${guest.shuttle ? 'yes' : 'no'}\n`
      body += `Dietary Restrictions: ${guest.diet}\n\n`
    })
    body += 'Songs:\n'
    rsvp.songs.forEach(song => {
      body += `- ${song}\n`
    })
    body += `\nComments:\n${rsvp.comments}`

    let mailOptions = {
      from: this.fromEmail,
      to: this.toEmail,
      subject: `RSVP: ${names}`,
      text: body
    }

    this.mailer.messages().send(mailOptions, (err) => {
        if(err){
            console.log('Failed to send rsvp notification ' + err + ' ' + JSON.stringify(rsvp));
            return callback(err)
        }
        console.log('Rsvp notification sent for ' + names)
        callback()
    })
  }
}

module.exports = MailService
