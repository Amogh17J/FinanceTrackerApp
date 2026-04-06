import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Dashboard from './pages/Dashboard.jsx';
import Transactions from './pages/Transactions';
import AddTransaction from './pages/AddTransaction';
import Budget from './pages/Budget';
import Analytics from './pages/Analytics';

function App() {
  return (
    <Router>
      <div className="flex min-h-screen bg-gray-50">

        <nav className="w-64 bg-slate-900 text-white p-6 shadow-xl">
          <h1 className="text-xl font-bold mb-8 text-blue-400">Finance Tracker</h1>
          <ul className="space-y-4">
            <li><Link to="/dashboard" className="hover:text-blue-300 transition">Dashboard</Link></li>
            <li><Link to="/transactions" className="hover:text-blue-300 transition">All Transactions</Link></li>
            <li><Link to="/budget" className="hover:text-blue-300 transition">Budget</Link></li>
            <li><Link to="/analytics" className="hover:text-blue-300 transition">Analytics</Link></li>
            <li>
              <Link to="/transactions/new" className="inline-block w-full bg-blue-600 text-center py-2 rounded-md mt-4 hover:bg-blue-500">
                + Add New
              </Link>
            </li>
          </ul>
        </nav>

        <main className="flex-1 p-8">
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/transactions" element={<Transactions />} />
            <Route path="/transactions/new" element={<AddTransaction />} />
            <Route path="/budget" element={<Budget />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/" element={<Dashboard />} />
          </Routes>
        </main>

      </div>
    </Router>
  );
}

export default App;