const mongoose = require('mongoose')
const Schema = mongoose.Schema
const FB = require('fb')
mongoose.connect('mongodb://localhost/login')

const userFbSchema = new mongoose.Schema({
  fb_id: String,
  name: String,
  email: String
})

function MdlFB (token) {
  return new Promise ((resolve,reject) => {
    FB.api('me', {fields: ['id','name','email'], access_token: token}, (response) => {
      resolve(response)
    })
  })
}

const fbuser = mongoose.model('fbuser', userFbSchema)

module.exports = {
  fbuser,
  MdlFB
}
