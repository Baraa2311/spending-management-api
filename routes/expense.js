const { protect } = require('../middleware/authMiddleware');
const express = require('express');
const Expense = require('../models/Expense');
const router = express.Router();

// Route to add an expense
router.post('/', protect, async (req, res) => {
    try {
        const { type, amount } = req.body;

        // Automatically attach the authenticated user
        const newExpense = new Expense({
            type,
            amount,
            user: req.user._id, // Use the authenticated user's ID
        });

        await newExpense.save();
        res.status(201).json({
            message: 'Expense added successfully',
            expense: newExpense,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
});

module.exports = router;