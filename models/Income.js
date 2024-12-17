const mongoose = require('mongoose');

const incomeSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  monthlyIncome: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model('Income', incomeSchema);