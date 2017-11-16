let express = require('express');
let router = express.Router();
let usersController = require('../controllers/usersController.js')
let verify = require('../controllers/loginController.js')

router.post('/',verify.verifyLogin,verify.verifyById,usersController.insertDataUser)

router.get('/',verify.verifyLogin,verify.verifyById,usersController.findAllUser)

router.put('/:id',verify.verifyLogin,verify.verifyById,usersController.updateUserById)

router.delete('/:id',verify.verifyLogin,verify.verifyById,usersController.removeUserById)

module.exports = router
