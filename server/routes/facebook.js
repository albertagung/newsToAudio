var express = require('express');
var router = express.Router();
var usersFb = require('../controllers/facebook')
var FB = require('fb')

var dataFB = (req, res, next) => {
  FB.setAccessToken(req.headers.fbaccesstoken)
  next()
}

router.post('/', dataFB, usersFb.loginFB)
router.get('/', dataFB, usersFb.loginFB)
module.exports = router;
