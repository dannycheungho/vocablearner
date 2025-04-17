// routes/vocabRoutes.js
const express = require('express');
const router = express.Router();
const { 
  getUserVocabs,
  getVocabById,
  addVocab,
  updateVocab,
  deleteVocab,
  getVocabsByDateRange
} = require('../controllers/vocabController');
const authenticate = require('../middleware/authMiddleware');
const validate = require('../middleware/validationMiddleware');

// Input validation schemas
const vocabSchema = {
  english: { type: 'string', min: 1, max: 100 },
  chinese: { type: 'string', min: 1, max: 100 },
  date: { type: 'string', optional: true, pattern: /^\d{4}-\d{2}-\d{2}$/ },
  rememberLevel: { type: 'number', min: 0, max: 5, optional: true }
};

// Routes
router.route('/')
  .get(authenticate, getUserVocabs) // GET /api/vocabs
  .post(authenticate, validate(vocabSchema), addVocab); // POST /api/vocabs

router.route('/:id')
  .put(authenticate, validate(vocabSchema), updateVocab) // PUT /api/vocabs/:id
  .delete(authenticate, deleteVocab); // DELETE /api/vocabs/:id

// Additional filtered routes
router.get('/filter/date-range', authenticate, (req, res) => {
  // GET /api/vocabs/filter/date-range?start=YYYY-MM-DD&end=YYYY-MM-DD
  getVocabsByDateRange(req, res);
});

module.exports = router;