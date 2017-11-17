const FacebookModel = require('../models/facebook')
const jwt = require('jsonwebtoken')
const FB = require('fb')
const mongoose = require('mongoose')

class Facebook {

  static loginFB (req,res) {
    FacebookModel.MdlFB(req.headers.token)
    .then(data => {
      console.log('INI DATA',data);
      var jwtToken = jwt.sign(data,process.env.SECRET_KEY)
      var decoded = jwt.verify(jwtToken, process.env.SECRET_KEY);
      FacebookModel.fbuser.findById(decoded.id)
      .then(userFacebook => {
        if (userFacebook) {
          console.log('SUDAH ADA TOKEN');
        } else {
          FacebookModel.create({
            fb_id: userFacebook.id,
            name: userFacebook.name,
            email: userFacebook.email
          })
          .then(data => {
            console.log('BERHASIL REGISTER',data);
          })
          .catch(err => {
            console.log('GAGAL REGISTER',err);
          })
        }
      })
      res.send(jwtToken)
    })
    .catch(err => {
      console.error(err);
    })
  }
}

module.exports = Facebook
