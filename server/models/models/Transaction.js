import mongoose from 'mongoose';

const TransactionSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true,
    trim: true,
  },
  amount: {
    type: mongoose.Schema.Types.Decimal128, 
    required: true,
    min: 0,
  },
  type: {
    type: String,
    enum: ['income', 'expense'],
    required: true,
  },
  date: {
    type: Date,
    required: true,
    default: Date.now,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  notes: {
    type: String,
    trim: true,
  },
}, { timestamps: true });

const Transaction = mongoose.model('Transaction', TransactionSchema);
export default Transaction;
