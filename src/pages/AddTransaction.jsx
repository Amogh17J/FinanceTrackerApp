import React, { useContext } from 'react';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { FinanceContext } from "../context/FinanceContext";

const schema = yup.object({
  title: yup.string().required("Title is required").min(3, "Title too short"),
  amount: yup.number().typeError("Must be a number").positive("Must be positive").required(),
  category: yup.string().required("Select a category"),
  type: yup.string().oneOf(['income', 'expense']).required(),
  date: yup.string().required("Date is required"),
}).required();

export default function AddTransaction() {
  const { addTransaction } = useContext(FinanceContext);
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
    defaultValues: { type: 'expense', date: new Date().toISOString().split('T')[0] }
  });

  const onSubmit = (data) => {
    addTransaction(data);
    navigate('/transactions');
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-8 rounded-2xl shadow-lg border border-slate-100">
      <h2 className="text-2xl font-bold mb-6 text-slate-800">Add New Transaction</h2>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1 text-slate-600">Title</label>
          <input {...register("title")} className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder="e.g. Netflix Subscription" />
          <p className="text-red-500 text-xs mt-1">{errors.title?.message}</p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1 text-slate-600">Amount (₹)</label>
            <input type="number" {...register("amount")} className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
            <p className="text-red-500 text-xs mt-1">{errors.amount?.message}</p>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-slate-600">Type</label>
            <select {...register("type")} className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white">
              <option value="expense">Expense</option>
              <option value="income">Income</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1 text-slate-600">Category</label>
            <select {...register("category")} className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white">
              <option value="">Select Category...</option>
              
              <optgroup label="Monthly Bills">
                <option value="Rent">Rent / Mortgage</option>
                <option value="Utilities">Electricity / Water</option>
                <option value="Groceries">Groceries</option>
                <option value="Internet">Internet / Phone</option>
              </optgroup>

              <optgroup label="Lifestyle">
                <option value="Food">Dining & Drinks</option>
                <option value="Shopping">Shopping</option>
                <option value="Entertainment">Entertainment</option>
                <option value="Health">Gym & Medical</option>
                <option value="Travel">Travel / Vacation</option>
              </optgroup>

              <optgroup label="Transport">
                <option value="Fuel">Fuel / Gas</option>
                <option value="Transport">Public Transport</option>
                <option value="Insurance">Insurance</option>
              </optgroup>

              <optgroup label="Financial">
                <option value="Salary">Salary / Income</option>
                <option value="Investment">Investments</option>
                <option value="EMI">EMI / Debt</option>
                <option value="Gifts">Gifts / Others</option>
              </optgroup>
            </select>
            <p className="text-red-500 text-xs mt-1">{errors.category?.message}</p>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-slate-600">Date</label>
            <input type="date" {...register("date")} className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
          </div>
        </div>

        <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition-all shadow-md active:scale-95">
          Save Transaction
        </button>
      </form>
    </div>
  );
}