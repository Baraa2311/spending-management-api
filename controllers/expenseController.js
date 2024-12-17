const Expense = require('../models/Expense');
const Income = require('../models/Income');

exports.getMonthlyStatistics = async (req, res) => {
  try {
    const income = await Income.findOne({ user: req.user.id });

    if (!income) {
      return res.status(400).json({ message: 'Monthly income not set' });
    }
 
    const expenses = await Expense.find({
      user: req.user.id,
      createdAt: { $gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1) }
    });

    const totalExpenses = expenses.reduce((acc, expense) => acc + expense.amount, 0);
    const remainingIncome = income.monthlyIncome - totalExpenses;
    const dailyAverage = totalExpenses / new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate(); 

    res.json({
      totalExpenses,
      remainingIncome,
      dailyAverage,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.getCategoryStatistics = async (req, res) => {
  try {
    const expenses = await Expense.find({
      user: req.user.id,
      createdAt: { $gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1) }
    });

    const categories = ['transportation', 'food', 'treatment', 'rent'];
    const categoryStats = categories.map((category) => {
      const categoryExpenses = expenses.filter(expense => expense.type === category);
      const totalCategoryExpenses = categoryExpenses.reduce((acc, expense) => acc + expense.amount, 0);
      return { category, totalCategoryExpenses };
    });

    res.json(categoryStats);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};