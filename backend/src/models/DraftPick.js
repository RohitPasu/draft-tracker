const mongoose = require('mongoose');

const playerSchema = new mongoose.Schema({
  id: String,
  name: String,
  position: String,
  college: String,
  height: String,
  weight: String,
  age: Number
});

const draftPickSchema = new mongoose.Schema({
  id: {
    type: String,
    required: false
  },
  round: {
    type: Number,
    required: true
  },
  pick: {
    type: Number,
    required: true
  },
  team: {
    type: String,
    required: true
  },
  player: playerSchema,
  timestamp: {
    type: Date,
    default: Date.now
  }
});

// Add a pre-save middleware to set the id field to _id if not provided
draftPickSchema.pre('save', function(next) {
  if (!this.id) {
    this.id = this._id.toString();
  }
  next();
});

module.exports = mongoose.model('DraftPick', draftPickSchema); 