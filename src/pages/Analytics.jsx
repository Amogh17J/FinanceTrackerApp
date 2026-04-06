import React, { useContext } from 'react';
import { FinanceContext } from '../context/FinanceContext';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function Analytics() {
  const { transactions } = useContext(FinanceContext);

  // 1. Prepare data for the Bar Chart
  const data = [
    {
      name: 'Total',
      Income: transactions.filter(t => t.type === 'income').reduce((acc, curr) => acc + Number(curr.amount), 0),
      Expense: transactions.filter(t => t.type === 'expense').reduce((acc, curr) => acc + Number(curr.amount), 0),
    }
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Financial Analytics</h2>
      
      <div className="bg-white p-6 rounded-xl shadow-md h-96">
        <h3 className="text-lg font-semibold mb-4">Income vs Expense Comparison</h3>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="Income" fill="#10b981" />
            <Bar dataKey="Expense" fill="#ef4444" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}