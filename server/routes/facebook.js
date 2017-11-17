var express = require('express');
var router = express.Router();
const usersFb = require('../controllers/facebook')
const FB = require('fb')

// const setAccessToken = (req, res, next) => {
//   FB.setAccessToken(req.headers.accesstoken);
//   next()
// }
router.post('/', usersFb.getUserFB)

module.exports = router;
