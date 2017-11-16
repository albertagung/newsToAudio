const FacebookModel = require('../models/facebook')
const jwt = require('jsonwebtoken')
const FB = require('fb')

class Facebook {
  static getUserFB (req,res) {
    FacebookModel.MdlFB(req.headers.token)
    .then(data => {
      var jwtToken = jwt.sign(data,process.env.SECRET_KEY)
      // console.log(jwtToken);
      // decoded
      // var decoded = jwt.verify(jwtToken, process.env.SECRET_KEY);
      res.send(jwtToken)
      // console.log(decoded);
    })
    .catch(err => {
      console.error(err);
    })
  }
}

module.exports = Facebook
