let mongoose = require('mongoose')
let Schema = mongoose.Schema

let usersSchema = new Schema(
  {
    first_name: String,
    last_name: String,
    username: String,
    password: String,
    role: String
  }
)

let User = mongoose.model('User',usersSchema)
module.exports = User
