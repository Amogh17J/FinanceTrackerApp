import React, { createContext, useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

export const FinanceContext = createContext();

export const FinanceProvider = ({ children }) => {
  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem('finance_data');
    return saved ? JSON.parse(saved) : [];
  });

  const [budget, setBudget] = useState(() => {
    const saved = localStorage.getItem('finance_budget');
    return saved ? Number(saved) : 50000;
  });

  useEffect(() => {
    console.log("💾 Syncing to LocalStorage:", transactions);
    localStorage.setItem('finance_data', JSON.stringify(transactions));
  }, [transactions]);

  useEffect(() => {
    localStorage.setItem('finance_budget', budget);
  }, [budget]);

  const addTransaction = (data) => {
    const newEntry = {
      ...data,
      id: uuidv4(),
      amount: Number(data.amount),
      date: data.date || new Date().toISOString().split('T')[0]
    };
    setTransactions((prev) => [newEntry, ...prev]);
  };

  const deleteTransaction = (id) => {
    setTransactions(prev => prev.filter(t => t.id !== id));
  };

  return (
    <FinanceContext.Provider value={{ transactions, addTransaction, deleteTransaction, budget, setBudget }}>
      {children}
    </FinanceContext.Provider>
  );
};