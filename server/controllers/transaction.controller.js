import Transaction from '../models/Transaction.js';
import mongoose from 'mongoose';

export const createTransaction = async (req, res) => {
  try {
    const { description, amount, type, date, category, notes } = req.body;
    const userId = req.userId;

    const decimalAmount = new mongoose.Types.Decimal128(amount.toString()); 

    const newTransaction = new Transaction({
      description,
      amount: decimalAmount,
      type,
      date,
      category,
      user: userId,
      notes,
    });

    await newTransaction.save();
    res.status(201).json(newTransaction);
  } catch (err) {
    res.status(500).json({ message: err.message |
      | 'Error creating transaction.' });
}
};

export const getTransactions = async (req, res) => {
  try {
    const userId = req.userId;
    const { type, category, startDate, endDate } = req.query;

    let query = { user: userId };
    if (type) query.type = type;
    if (category) query.category = category;
    if (startDate |
| endDate) {
query.date = {};
if (startDate) query.date.$gte = new Date(startDate);
if (endDate) query.date.$lte = new Date(endDate);
}

    const transactions = await Transaction.find(query).populate('category'); // Populate category details
    res.status(200).json(transactions);
  } catch (err) {
    res.status(500).json({ message: err.message |
| 'Error fetching transactions.' });
}
};

export const getTransactionById = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.userId;

    const transaction = await Transaction.findOne({ _id: id, user: userId }).populate('category');
    if (!transaction) {
      return res.status(404).json({ message: 'Transaction not found or you do not have permission to view it.' });
    }
    res.status(200).json(transaction);
  } catch (err) {
    res.status(500).json({ message: err.message |
| 'Error fetching transaction.' });
}
};

export const updateTransaction = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.userId;
    const { description, amount, type, date, category, notes } = req.body;

    const updateFields = { description, type, date, category, notes };
    if (amount) {
      updateFields.amount = new mongoose.Types.Decimal128(amount.toString());
    }

    const updatedTransaction = await Transaction.findOneAndUpdate(
      { _id: id, user: userId },
      updateFields,
      { new: true, runValidators: true }
    ).populate('category');

    if (!updatedTransaction) {
      return res.status(404).json({ message: 'Transaction not found or you do not have permission to update it.' });
    }
    res.status(200).json(updatedTransaction);
  } catch (err) {
    res.status(500).json({ message: err.message |
| 'Error updating transaction.' });
}
};

export const deleteTransaction = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.userId;

    const deletedTransaction = await Transaction.findOneAndDelete({ _id: id, user: userId });

    if (!deletedTransaction) {
      return res.status(404).json({ message: 'Transaction not found or you do not have permission to delete it.' });
    }
    res.status(200).json({ message: 'Transaction deleted successfully.' });
  } catch (err) {
    res.status(500).json({ message: err.message |
| 'Error deleting transaction.' });
}
};
