// routes/finalMarkRoutes.js
const express = require('express');
const router = express.Router();
const finalMarkController = require('../Controller/FInalMarskController');

router.post('/add', finalMarkController.addFinalMarks);
router.get('/view', finalMarkController.viewFinalMarks); // Add this line to define the view route

module.exports = router;
