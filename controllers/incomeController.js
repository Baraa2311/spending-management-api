const Income = require('../models/Income');

exports.setIncome = async (req, res) => {
  const { monthlyIncome } = req.body;
  try {
    const income = new Income({ user: req.user.id, monthlyIncome });
    await income.save();
    res.status(201).json({ message: 'Income set successfully', income });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};