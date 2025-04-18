const express = require('express');
const router = express.Router();
const draftPickController = require('../controllers/draftPickController');

// Get all draft picks
router.get('/', draftPickController.getDraftPicks);

// Add a new draft pick
router.post('/', draftPickController.addDraftPick);

// Update a draft pick
router.put('/:id', draftPickController.updateDraftPick);

// Delete a draft pick
router.delete('/:id', draftPickController.deleteDraftPick);

// Clear all draft picks
router.delete('/', draftPickController.clearDraftPicks);

module.exports = router; 