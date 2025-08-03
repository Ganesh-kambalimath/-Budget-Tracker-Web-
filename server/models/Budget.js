import mongoose from 'mongoose';

const BudgetSchema = new mongoose.Schema({
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true,
  },
  limit: {
    type: mongoose.Schema.Types.Decimal128, 
    required: true,
    min: 0,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  period: {
    type: String,
    enum: ['monthly', 'weekly', 'yearly'],
    default: 'monthly',
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
}, { timestamps: true });

BudgetSchema.index({ category: 1, user: 1, period: 1 }, { unique: true });

const Budget = mongoose.model('Budget', BudgetSchema);
export default Budget;
