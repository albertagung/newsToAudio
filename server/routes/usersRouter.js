let express = require('express');
let router = express.Router();
let usersController = require('../controllers/usersController.js')

router.post('/',usersController.insertDataUser)

router.get('/',usersController.findAllUser)

router.put('/:id',usersController.updateUserById)

router.delete('/:id',usersController.removeUserById)

module.exports = router
