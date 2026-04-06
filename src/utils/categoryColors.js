export const getCategoryColor = (category) => {
  const colors = {
    // Group: Monthly Bills
    Rent: 'bg-red-100 text-red-700 border-red-200',
    Utilities: 'bg-yellow-100 text-yellow-700 border-yellow-200',
    Groceries: 'bg-lime-100 text-lime-700 border-lime-200',
    
    // Group: Lifestyle
    Food: 'bg-orange-100 text-orange-700 border-orange-200',
    Shopping: 'bg-purple-100 text-purple-700 border-purple-200',
    Health: 'bg-pink-100 text-pink-700 border-pink-200',
    
    // Group: Financial
    Salary: 'bg-emerald-100 text-emerald-700 border-emerald-200',
    Investment: 'bg-blue-100 text-blue-700 border-blue-200',
    
    // Fallback for anything else
    default: 'bg-slate-100 text-slate-600 border-slate-200'
  };

  return colors[category] || colors.default;
};