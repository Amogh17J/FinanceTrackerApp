import React, { useContext, useState } from 'react';
import useCurrency from '../hooks/useCurrency';
import { FinanceContext } from '../context/FinanceContext';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

export default function Dashboard() {
  const [selectedCurrency, setSelectedCurrency] = useState('INR');
  const { convert, loading: currencyLoading } = useCurrency('INR');
  const { transactions } = useContext(FinanceContext);

  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((acc, curr) => acc + Number(curr.amount), 0);

  const totalExpenses = transactions
    .filter(t => t.type === 'expense')
    .reduce((acc, curr) => acc + Number(curr.amount), 0);

  const balance = totalIncome - totalExpenses;

  const expenseData = transactions
    .filter(t => t.type === 'expense')
    .reduce((acc, curr) => {
      const existing = acc.find(item => item.name === curr.category);
      if (existing) {
        existing.value += Number(curr.amount);
      } else {
        acc.push({ name: curr.category, value: Number(curr.amount) });
      }
      return acc;
    }, []);

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold text-gray-800">Financial Summary</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* Total Balance Card with Currency Converter */}
        <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-blue-500">
          <p className="text-sm text-gray-500 uppercase font-bold">Total Balance</p>
          <h3 className="text-2xl font-black text-gray-800">
            {currencyLoading ? 'Loading...' : `${selectedCurrency} ${convert(balance, selectedCurrency)}`}
          </h3>
          <select
            className="mt-3 text-sm border border-gray-300 rounded-md p-1 text-gray-600"
            value={selectedCurrency}
            onChange={(e) => setSelectedCurrency(e.target.value)}
          >
            <option value="INR">INR</option>
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="GBP">GBP</option>
            <option value="JPY">JPY</option>
            <option value="AED">AED</option>
          </select>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-green-500">
          <p className="text-sm text-gray-500 uppercase font-bold">Total Income</p>
          <h3 className="text-2xl font-black text-green-600">+ ₹{totalIncome.toLocaleString()}</h3>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-red-500">
          <p className="text-sm text-gray-500 uppercase font-bold">Total Expenses</p>
          <h3 className="text-2xl font-black text-red-600">- ₹{totalExpenses.toLocaleString()}</h3>
        </div>
      </div>

      <div className="bg-white p-8 rounded-xl shadow-md">
        <h3 className="text-xl font-bold mb-6 text-gray-700">Spending by Category</h3>
        <div className="h-80 w-full">
          {expenseData.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={expenseData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {expenseData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex items-center justify-center h-full text-gray-400 italic">
              Add some expenses to see the breakdown.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}