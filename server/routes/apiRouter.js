let express = require('express');
let router = express.Router();
let apiController = require('../controllers/apiController.js')

router.get('/', (req, res) => {
	res.send('Third Party API');
})



module.exports = router
