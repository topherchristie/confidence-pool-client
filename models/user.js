const mongoose = require('mongoose')

const userSchema = {
  username: String,
//  password: String,
  email: String,
  firstName: String,
  lastName: String,
  displayName: String,
  emailUpdates: {type:Boolean, default:true},
  facebook_id: String,
  twitter_id: String,
  google_id: String
}

module.exports = mongoose.model('User', userSchema)
