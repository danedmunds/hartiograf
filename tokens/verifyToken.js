const crypto = require('crypto')

module.export = (token, id) => {
  return crypto.createHmac('sha1', process.env.SECRET).update(id).digest('hex') === token
}
