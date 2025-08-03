import Transaction from '../models/Transaction.js';
import pdf from 'pdf-creator-node'; 
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const generateMonthlyReport = async (req, res) => {
  try {
    const userId = req.userId;
    const { year, month, format } = req.query; 

    if (!year ||!month ||!format) {
      return res.status(400).json({ message: 'Year, month, and format are required query parameters.' });
    }

    const startDate = new Date(year, parseInt(month), 1);
    const endDate = new Date(year, parseInt(month) + 1, 0, 23, 59, 59, 999);

    const transactions = await Transaction.find({
      user: userId,
      date: { $gte: startDate, $lte: endDate },
    }).populate('category').sort({ date: 1 });

    let totalIncome = 0;
    let totalExpense = 0;
    const expenseByCategory = {};
    const incomeByCategory = {};

    transactions.forEach(t => {
      const amount = parseFloat(t.amount.toString());
      if (t.type === 'income') {
        totalIncome += amount;
        incomeByCategory[t.category.name] = (incomeByCategory[t.category.name] |
                                             | 0) + amount;
} else {
totalExpense += amount;
expenseByCategory[t.category.name] = (expenseByCategory[t.category.name] |

| 0) + amount;
}
});

    const reportMonth = new Date(year, parseInt(month)).toLocaleString('en-US', { month: 'long', year: 'numeric' });
    const userName = req.user.username; 

    if (format === 'csv') {
      let csvContent = 'Date,Description,Category,Type,Amount,Notes\n';
      transactions.forEach(t => {
        csvContent += `${t.date.toISOString().split('T')},"${t.description}","${t.category.name}",${t.type},${parseFloat(t.amount.toString()).toFixed(2)},"${t.notes |
| ''}"\n; }); csvContent += \nTotal Income:,totalIncome.toFixed(2)
n‘;csvContent+=‘TotalExpense:,{totalExpense.toFixed(2)}\n; csvContent += Net Savings:,${(totalIncome - totalExpense).toFixed(2)}\n`;

      res.setHeader('Content-Type', 'text/csv');
      res.setHeader('Content-Disposition', `attachment; filename="MoneyMap_Report_${reportMonth.replace(/ /g, '_')}.csv"`);
      return res.status(200).send(csvContent);
    } else if (format === 'pdf') {
      const htmlTemplatePath = path.join(__dirname, '../templates/report.html');
      const html = fs.readFileSync(htmlTemplatePath, 'utf-8');

      const document = {
        html: html,
        data: {
          userName: userName,
          reportMonth: reportMonth,
          totalIncome: totalIncome.toFixed(2),
          totalExpense: totalExpense.toFixed(2),
          netSavings: (totalIncome - totalExpense).toFixed(2),
          transactions: transactions.map(t => ({
            date: t.date.toISOString().split('T'),
            description: t.description,
            category: t.category.name,
            type: t.type,
            amount: parseFloat(t.amount.toString()).toFixed(2),
            notes: t.notes |
| '',
})),
expenseByCategory: Object.entries(expenseByCategory).map(([category, amount]) => ({ category, amount: amount.toFixed(2) })),
incomeByCategory: Object.entries(incomeByCategory).map(([category, amount]) => ({ category, amount: amount.toFixed(2) })),
},
path: ./MoneyMap_Report_${reportMonth.replace(/ /g, '_')}.pdf,
type: 'buffer', 
};

      const options = {
        format: 'A4',
        orientation: 'portrait',
        border: '10mm',
        header: {
          height: '15mm',
          contents: `<div style="text-align: center; font-size: 10px;">MoneyMap Financial Report - ${reportMonth}</div>`
        },
        footer: {
          height: '10mm',
          contents: {
            default: '<span style="color: #444; font-size: 8px;">{{page}}</span>/<span>{{pages}}</span>',
          }
        }
      };

      const pdfBuffer = await pdf.create(document, options);
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', `attachment; filename="MoneyMap_Report_${reportMonth.replace(/ /g, '_')}.pdf"`);
      return res.status(200).send(pdfBuffer);

    } else {
      return res.status(400).json({ message: 'Invalid report format. Choose "csv" or "pdf".' });
    }
  } catch (err) {
    console.error('Error generating report:', err);
    res.status(500).json({ message: err.message |
| 'Error generating report.' });
}
};
