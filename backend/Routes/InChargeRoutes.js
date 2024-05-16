const express = require('express');
const router = express.Router();
const InChargeController = require('../Controller/InchargeController');

// Route for creating a lecturer

// Route for lecturer login
router.post('/login', InChargeController.login);



module.exports = router;
