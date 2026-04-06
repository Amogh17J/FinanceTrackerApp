import React, { useContext, useState } from 'react';
import { FinanceContext } from '../context/FinanceContext';
import { FaTrash, FaSearch } from 'react-icons/fa';
import { getCategoryColor } from '../utils/categoryColors'; // 1. IMPORT THE TRANSLATOR

export default function Transactions() {
  const { transactions, deleteTransaction } = useContext(FinanceContext);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('All');

  const filteredList = transactions.filter(t => {
    const matchesSearch = t.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'All' || t.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <h2 className="text-2xl font-bold text-slate-800">Transactions</h2>

        <div className="flex gap-2 w-full md:w-auto">
          <div className="relative flex-1">
            <FaSearch className="absolute left-3 top-3 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search title..."
              className="pl-10 p-2 border rounded-lg w-full focus:ring-2 focus:ring-blue-500 outline-none"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          {/* 2. UPDATED FILTER DROPDOWN TO MATCH NEW CATEGORIES */}
          <select 
            className="p-2 border rounded-lg bg-white outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setFilterCategory(e.target.value)}
          >
            <option value="All">All Categories</option>
            <option value="Rent">Rent</option>
            <option value="Utilities">Utilities</option>
            <option value="Groceries">Groceries</option>
            <option value="Food">Food & Dining</option>
            <option value="Shopping">Shopping</option>
            <option value="Salary">Salary</option>
            <option value="Investment">Investment</option>
            <option value="Transport">Transport</option>
          </select>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead className="bg-slate-50 border-b border-slate-100">
            <tr>
              <th className="p-4 text-slate-600 font-semibold text-sm">Date</th>
              <th className="p-4 text-slate-600 font-semibold text-sm">Title</th>
              <th className="p-4 text-slate-600 font-semibold text-sm">Category</th>
              <th className="p-4 text-slate-600 font-semibold text-sm">Amount</th>
              <th className="p-4 text-slate-600 font-semibold text-sm">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredList.length > 0 ? (
              filteredList.map(t => (
                <tr key={t.id} className="border-b border-slate-50 hover:bg-slate-50 transition-colors">
                  <td className="p-4 text-sm text-slate-500">{new Date(t.date).toLocaleDateString()}</td>
                  <td className="p-4 font-medium text-slate-700">{t.title}</td>
                  
                  {/* 3. DYNAMIC COLOR LINKING HAPPENS HERE */}
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider border ${getCategoryColor(t.category)}`}>
                      {t.category}
                    </span>
                  </td>

                  <td className={`p-4 font-bold ${t.type === 'income' ? 'text-emerald-600' : 'text-rose-600'}`}>
                    {t.type === 'income' ? '+' : '-'} ₹{t.amount.toLocaleString()}
                  </td>
                  <td className="p-4">
                    <button 
                      onClick={() => deleteTransaction(t.id)} 
                      className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-all"
                    >
                      <FaTrash size={14} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="p-10 text-center text-slate-400">
                  No transactions found matching your search.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}