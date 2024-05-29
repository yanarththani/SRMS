const express = require('express');
const router = express.Router();
const icamarksController = require('../Controller/ICAEController');

// Routes
router.post('/add', icamarksController.addICAMarks);
router.get('/:course', icamarksController.getICAMarksByCourse);
router.put('/:id', icamarksController.updateICAMarks);
router.delete('/:regNo', icamarksController.deleteICAMarks);

module.exports = router;