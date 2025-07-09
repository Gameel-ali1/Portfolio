const express = require('express');
const router = express.Router();
const writeupController = require('../controllers/writeupController');

// Get all writeups
router.get('/writeups', writeupController.getAllWriteups);

// Get single writeup by ID
router.get('/writeups/:id', writeupController.getWriteup);

// Create new writeup
router.post('/writeups', writeupController.createWriteup);

// Update writeup
router.put('/writeups/:id', writeupController.updateWriteup);

// Delete writeup
router.delete('/writeups/:id', writeupController.deleteWriteup);

// Add comment to writeup
router.post('/writeups/:id/comments', writeupController.addComment);

// Get comments for a writeup
router.get('/writeups/:id/comments', writeupController.getComments);

// Toggle like on writeup
router.post('/writeups/:id/like', writeupController.toggleLike);

module.exports = router; 