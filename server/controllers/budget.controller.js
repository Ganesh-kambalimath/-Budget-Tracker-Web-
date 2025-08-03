import Budget from '../models/Budget.js';
import Transaction from '../models/Transaction.js';
import mongoose from 'mongoose';

export const createBudget = async (req, res) => {
  try {
    const { category, limit, period, startDate, endDate } = req.body;
    const userId = req.userId;

    const decimalLimit = new mongoose.Types.Decimal128(limit.toString()); 

    const newBudget = new Budget({
      category,
      limit: decimalLimit,
      period,
      startDate,
      endDate,
      user: userId,
    });

    await newBudget.save();
    res.status(201).json(newBudget);
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({ message: 'A budget for this category and period already exists for this user.' });
    }
    res.status(500).json({ message: err.message |
      | 'Error creating budget.' });
}
};

export const getBudgets = async (req, res) => {
  try {
    const userId = req.userId;
    const budgets = await Budget.find({ user: userId }).populate('category');
    res.status(200).json(budgets);
  } catch (err) {
    res.status(500).json({ message: err.message |
| 'Error fetching budgets.' });
}
};

export const updateBudget = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.userId;
    const { category, limit, period, startDate, endDate } = req.body;

    const updateFields = { category, period, startDate, endDate };
    if (limit) {
      updateFields.limit = new mongoose.Types.Decimal128(limit.toString()); // [15]
    }

    const updatedBudget = await Budget.findOneAndUpdate(
      { _id: id, user: userId },
      updateFields,
      { new: true, runValidators: true }
    ).populate('category');

    if (!updatedBudget) {
      return res.status(404).json({ message: 'Budget not found or you do not have permission to update it.' });
    }
    res.status(200).json(updatedBudget);
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({ message: 'A budget for this category and period already exists for this user.' });
    }
    res.status(500).json({ message: err.message |
| 'Error updating budget.' });
}
};

export const deleteBudget = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.userId;

    const deletedBudget = await Budget.findOneAndDelete({ _id: id, user: userId });

    if (!deletedBudget) {
      return res.status(404).json({ message: 'Budget not found or you do not have permission to delete it.' });
      }
    res.status(200).json({ message: 'Budget deleted successfully.' });
  } catch (err) {
    res.status(500).json({ message: err.message |
| 'Error deleting budget.' });
}
};

export const getBudgetSummary = async (req, res) => {
  try {
    const userId = req.userId;
    const { period = 'monthly', date = new Date().toISOString() } = req.query; 

    const targetDate = new Date(date);
    let startDate, endDate;

    if (period === 'monthly') {
      startDate = new Date(targetDate.getFullYear(), targetDate.getMonth(), 1);
      endDate = new Date(targetDate.getFullYear(), targetDate.getMonth() + 1, 0, 23, 59, 59, 999);
    } else if (period === 'weekly') {
      const dayOfWeek = targetDate.getDay(); 
      startDate = new Date(targetDate);
      startDate.setDate(targetDate.getDate() - dayOfWeek); 
      startDate.setHours(0, 0, 0, 0);
      endDate = new Date(startDate);
      endDate.setDate(startDate.getDate() + 6);
      endDate.setHours(23, 59, 59, 999);
    } else if (period === 'yearly') {
      startDate = new Date(targetDate.getFullYear(), 0, 1);
      endDate = new Date(targetDate.getFullYear(), 11, 31, 23, 59, 59, 999);
    } else {
      return res.status(400).json({ message: 'Invalid period specified. Use "monthly", "weekly", or "yearly".' });
    }


    const budgets = await Budget.find({ user: userId, period }).populate('category');

    const expenseSummary = await Transaction.aggregate();

    const summary = budgets.map(budget => {
      const spent = expenseSummary.find(s => s._id.equals(budget.category._id));
      const totalSpent = spent? spent.totalSpent : 0;
      const budgetLimit = parseFloat(budget.limit.toString()); 

      return {
        category: budget.category.name,
        categoryId: budget.category._id,
        budgetLimit,
        totalSpent,
        remaining: budgetLimit - totalSpent,
        percentageUsed: (totalSpent / budgetLimit) * 100,
        alert: (totalSpent / budgetLimit) * 100 >= 80, 
      };
    });

    res.status(200).json(summary);
  } catch (err) {
    res.status(500).json({ message: err.message |
| 'Error fetching budget summary.' });
}
};
