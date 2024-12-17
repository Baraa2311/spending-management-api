const express = require('express');
const { setIncome } = require('../controllers/incomeController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', protect, setIncome);

module.exports = router;