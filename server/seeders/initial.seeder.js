import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import Category from '../models/Category.js';
import Transaction from '../models/Transaction.js';
import Budget from '../models/Budget.js';
import dotenv from 'dotenv';

dotenv.config();

export const initialSeed = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Seeder: MongoDB Connected...');

    let ganeshUser = await User.findOne({ username: 'Ganesh' });

    if (!ganeshUser) {
      console.log('Seeder: Creating Ganesh user...');
      const hashedPassword = bcrypt.hashSync('password123', 8); 
      ganeshUser = new User({
        username: 'Ganesh',
        email: 'ganesh@example.com',
        password: hashedPassword,
      });
      await ganeshUser.save();
      console.log('Seeder: Ganesh user created.');
    } else {
      console.log('Seeder: Ganesh user already exists. Skipping creation.');
    }

    // Seed initial 
    const existingCategoriesCount = await Category.countDocuments({ user: ganeshUser._id });
    if (existingCategoriesCount === 0) {
      console.log('Seeder: Creating initial categories for Ganesh...');
      const categories =;
      await Category.insertMany(categories);
      console.log('Seeder: Initial categories created.');
    } else {
      console.log('Seeder: Categories already exist for Ganesh. Skipping creation.');
    }

    const existingTransactionsCount = await Transaction.countDocuments({ user: ganeshUser._id });
    if (existingTransactionsCount === 0) {
      console.log('Seeder: Creating sample transactions for Ganesh...');
      const foodCategory = await Category.findOne({ name: 'Food', user: ganeshUser._id });
      const salaryCategory = await Category.findOne({ name: 'Salary', user: ganeshUser._id });

      if (foodCategory && salaryCategory) {
        const transactions =;
        await Transaction.insertMany(transactions);
        console.log('Seeder: Sample transactions created.');
      }
    } else {
      console.log('Seeder: Transactions already exist for Ganesh. Skipping creation.');
    }

    const existingBudgetsCount = await Budget.countDocuments({ user: ganeshUser._id });
    if (existingBudgetsCount === 0) {
      console.log('Seeder: Creating sample budgets for Ganesh...');
      const foodCategory = await Category.findOne({ name: 'Food', user: ganeshUser._id });
      if (foodCategory) {
        const budgets =;
        await Budget.insertMany(budgets);
        console.log('Seeder: Sample budgets created.');
      }
    } else {
      console.log('Seeder: Budgets already exist for Ganesh. Skipping creation.');
    }
    */

    console.log('Seeder: Initial seeding process complete.');
  } catch (err) {
    console.error('Seeder: Error during initial seeding:', err.message);
  } finally {
    // await mongoose.disconnect(); // Disconnect if running as a standalone script
  }
};

// To run this seeder manually, uncomment the following line:
// initialSeed();
