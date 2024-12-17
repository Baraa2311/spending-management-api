const express = require('express');
const { getMonthlyStatistics, getCategoryStatistics } = require('../controllers/expenseController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/monthly', protect, getMonthlyStatistics);

router.get('/categories', protect, getCategoryStatistics);

module.exports = router;