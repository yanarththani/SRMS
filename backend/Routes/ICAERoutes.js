// icamarksRouter.js
const express = require('express');
const router = express.Router();
const icamarksController = require('../Controller/ICAEController');

// Routes
router.post('/add', icamarksController.addICAMarks);
router.get('/', icamarksController.getICAMarks);
router.get('/:id', icamarksController.getICAMarksById);
router.put('/:id', icamarksController.updateICAMarks);
router.delete('/:id', icamarksController.deleteICAMarks);

module.exports = router;
