const express = require('express');
const router = express.Router();
const vocabController = require('../controllers/vocabController');
const authenticate = require('../middleware/authMiddleware');

router.get('/', authenticate, vocabController.getUserVocabs);
router.post('/', authenticate, vocabController.addVocab);
router.put('/:id', authenticate, vocabController.updateVocab);
router.delete('/:id', authenticate, vocabController.deleteVocab);

module.exports = router;