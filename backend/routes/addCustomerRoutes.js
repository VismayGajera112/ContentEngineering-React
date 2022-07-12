const express = require('express');
const customerCtrl = require('../controllers/customerController')
const otpController = require('../controllers/otpController')

const router = express.Router();

router.get('/', customerCtrl.getUser);

/* Creating a route for the login page. */
router.post('/login', customerCtrl.loginCustomer);

/* Creating a route for the register page. */
router.post('/register',customerCtrl.registerCustomer)

/* Creating a route for the sendcode page. */
router.post('/sendcode', otpController.sendCode)

router.post('/verifycode', otpController.verifyCode)

router.post('/refresh', otpController.refreshToken)

router.get('/logout', otpController.logout)

module.exports = router;