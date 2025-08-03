import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.config.js';
import authRoutes from './routes/auth.routes.js';
import categoryRoutes from './routes/category.routes.js';
import transactionRoutes from './routes/transaction.routes.js';
import budgetRoutes from './routes/budget.routes.js';
import reportRoutes from './routes/report.routes.js';
import { initialSeed } from './seeders/initial.seeder.js';

dotenv.config(); 

const app = express();

connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true })); 

const allowedOrigins =;

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true, 
}));

app.use('/api/auth', authRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/transactions', transactionRoutes);
app.use('/api/budgets', budgetRoutes);
app.use('/api/reports', reportRoutes);

app.get('/', (req, res) => {
  res.send('MoneyMap Backend API is running!');
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.statusCode |
             | 500).json({
message: err.message |

| 'Something went wrong!',
error: process.env.NODE_ENV === 'production'? {} : err.stack,
});
});

const PORT = process.env.PORT |
| 5000; 

app.listen(PORT, () => {
console.log(Server running on port ${PORT});
});
