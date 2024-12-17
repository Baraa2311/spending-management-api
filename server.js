const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const expenseRoutes = require('./routes/expense');
const statisticsRoutes = require('./routes/statistics');
const userRoutes = require('./routes/auth');
const incomeRoutes = require('./routes/income'); // If you have income routes for user income

dotenv.config();

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use('/api/expense', expenseRoutes); // Routes for adding expenses
app.use('/api/expense/statistics', statisticsRoutes); // Routes for statistics
app.use('/api/user', userRoutes); // Routes for user actions like login, registration
app.use('/api/income', incomeRoutes); // Routes for income-related actions

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});