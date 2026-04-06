import React, { useContext, useState } from 'react';
import { FinanceContext } from '../context/FinanceContext';

export default function Budget() {
  // 1. Get data from the Brain
  const { transactions, budget, setBudget } = useContext(FinanceContext);
  const [tempBudget, setTempBudget] = useState(budget);

  // 2. Calculate current spending (Expenses only)
  const currentSpending = transactions
    .filter(t => t.type === 'expense')
    .reduce((acc, curr) => acc + Number(curr.amount), 0);

  // 3. Calculate percentage and remaining
  const percentage = Math.min((currentSpending / budget) * 100, 100);
  const remaining = budget - currentSpending;
  const isOverBudget = currentSpending > budget;

  const handleUpdateBudget = () => {
    setBudget(Number(tempBudget));
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <h2 className="text-2xl font-bold text-gray-800">Monthly Budget Tracker</h2>

      {/* Budget Setter Card */}
      <div className="bg-white p-6 rounded-xl shadow-md flex items-end gap-4">
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-600 mb-1">Set Monthly Limit (₹)</label>
          <input 
            type="number" 
            value={tempBudget}
            onChange={(e) => setTempBudget(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button 
          onClick={handleUpdateBudget}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-blue-700 transition"
        >
          Update
        </button>
      </div>

      {/* Progress Section */}
      <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100">
        <div className="flex justify-between items-end mb-4">
          <div>
            <p className="text-gray-500 text-sm uppercase font-bold tracking-wider">Total Spending</p>
            <h3 className={`text-3xl font-black ${isOverBudget ? 'text-red-600' : 'text-gray-800'}`}>
              ₹{currentSpending.toLocaleString()}
            </h3>
          </div>
          <div className="text-right">
            <p className="text-gray-500 text-sm">of ₹{budget.toLocaleString()} limit</p>
          </div>
        </div>

        {/* 4. The Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-4 mb-6 overflow-hidden">
          <div 
            className={`h-full transition-all duration-500 ${isOverBudget ? 'bg-red-500' : 'bg-green-500'}`}
            style={{ width: `${percentage}%` }}
          ></div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-xs text-gray-500 uppercase">Remaining</p>
            <p className={`text-xl font-bold ${remaining < 0 ? 'text-red-500' : 'text-gray-800'}`}>
              ₹{remaining.toLocaleString()}
            </p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-xs text-gray-500 uppercase">Usage</p>
            <p className="text-xl font-bold text-gray-800">{percentage.toFixed(1)}%</p>
          </div>
        </div>
      </div>
    </div>
  );
}