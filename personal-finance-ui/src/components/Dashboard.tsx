
import React, { useState, useMemo } from 'react';
import { Transaction, Category, Settings, TransactionType } from '../types';
import Summary from './Summary';
import TransactionForm from './TransactionForm';
import TransactionList from './TransactionList';
import FinanceChart from './FinanceChart';
import Card from './ui/Card';

interface DashboardProps {
  transactions: Transaction[];
  categories: Category[];
  settings: Settings;
  currencySymbol: string;
  addTransaction: (transaction: Omit<Transaction, 'id'>) => Promise<void>;
  updateTransaction: (transaction: Transaction) => Promise<void>;
  deleteTransaction: (id: string) => Promise<void>;
  addCategory: (category: Omit<Category, 'id'>) => Promise<Category>;
}

const Dashboard: React.FC<DashboardProps> = ({
  transactions,
  categories,
  settings,
  currencySymbol,
  addTransaction,
  updateTransaction,
  deleteTransaction,
  addCategory
}) => {
  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null);
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [filterMonth, setFilterMonth] = useState<string>('all');

  const filteredTransactions = useMemo(() => {
    return transactions
      .filter(t => filterCategory === 'all' || t.category.id === filterCategory)
      .filter(t => filterMonth === 'all' || t.date.startsWith(filterMonth))
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [transactions, filterCategory, filterMonth]);

  const handleEdit = (transaction: Transaction) => {
    setEditingTransaction(transaction);
  };
  
  const handleFormSubmit = async (transactionData: Omit<Transaction, 'id'>) => {
     if (editingTransaction) {
        await updateTransaction({ ...transactionData, id: editingTransaction.id });
        setEditingTransaction(null);
     } else {
        await addTransaction(transactionData);
     }
  };
  
  const availableMonths = useMemo(() => {
    const months = new Set(transactions.map(t => t.date.substring(0, 7)));
    return Array.from(months).sort().reverse();
  }, [transactions]);

  return (
    <div className="space-y-6">
      <Summary transactions={filteredTransactions} currencySymbol={currencySymbol} />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
           <Card>
                <h2 className="text-xl font-semibold mb-4">نمودار هزینه‌ها</h2>
                <FinanceChart transactions={filteredTransactions} type={settings.chartType} />
            </Card>
        </div>
        <div className="lg:col-span-1">
             <TransactionForm
                key={editingTransaction ? editingTransaction.id : 'new'}
                onSubmit={handleFormSubmit}
                categories={categories}
                addCategory={addCategory}
                initialData={editingTransaction}
                onCancelEdit={() => setEditingTransaction(null)}
              />
        </div>
      </div>
      
      <Card>
        <h2 className="text-xl font-semibold mb-4">لیست تراکنش‌ها</h2>
        <div className="flex flex-col sm:flex-row gap-4 mb-4">
            <select
              value={filterMonth}
              onChange={(e) => setFilterMonth(e.target.value)}
              className="w-full sm:w-auto bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">همه ماه‌ها</option>
              {availableMonths.map(month => (
                <option key={month} value={month}>{new Date(month + '-02').toLocaleDateString('fa-IR', { year: 'numeric', month: 'long' })}</option>
              ))}
            </select>
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="w-full sm:w-auto bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">همه دسته‌ها</option>
              {categories.filter(c => c.type === TransactionType.EXPENSE).map(cat => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
        </div>
        <TransactionList
            transactions={filteredTransactions}
            onEdit={handleEdit}
            onDelete={deleteTransaction}
            currencySymbol={currencySymbol}
        />
      </Card>
    </div>
  );
};

export default Dashboard;
