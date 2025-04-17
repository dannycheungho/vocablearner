const mongoose = require('mongoose');

const vocabSchema = new mongoose.Schema({
  english: {
    type: String,
    required: true,
    trim: true
  },
  chinese: {
    type: String,
    required: true,
    trim: true
  },
  date: {
    type: Date,
    required: true,
    default: Date.now
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Vocab', vocabSchema);