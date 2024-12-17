const express = require('express');
const router = express.Router();
const Expense = require('../models/Expense'); 

router.post('/', async (req, res) => {
    try {
        const { type, amount, user } = req.body;
        const newExpense = new Expense({ type, amount, user });
        await newExpense.save();
        res.status(201).json({
            message: 'Expense added successfully',
            expense: newExpense
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
});

module.exports = router;