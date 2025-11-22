
import React, { useMemo } from 'react';
import { Transaction, TransactionType } from '../types';
import Card from './ui/Card';
import { ArrowUpIcon, ArrowDownIcon, BanknotesIcon } from './icons/Icons';

interface SummaryProps {
  transactions: Transaction[];
  currencySymbol: string;
}

const Summary: React.FC<SummaryProps> = ({ transactions, currencySymbol }) => {
  const { totalIncome, totalExpenses, balance } = useMemo(() => {
    const income = transactions
      .filter((t) => t.type === TransactionType.INCOME)
      .reduce((sum, t) => sum + t.amount, 0);
    const expenses = transactions
      .filter((t) => t.type === TransactionType.EXPENSE)
      .reduce((sum, t) => sum + t.amount, 0);
    return {
      totalIncome: income,
      totalExpenses: expenses,
      balance: income - expenses,
    };
  }, [transactions]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('fa-IR').format(amount);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
      <Card className="flex items-start p-4 bg-green-50 dark:bg-green-900/50 border-green-200 dark:border-green-800">
        <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center bg-green-100 dark:bg-green-800 rounded-full">
            <ArrowUpIcon className="w-6 h-6 text-green-600 dark:text-green-300" />
        </div>
        <div className="mr-4">
          <p className="text-sm font-medium text-green-600 dark:text-green-300">درآمد کل</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">
            {formatCurrency(totalIncome)} <span className="text-sm font-normal">{currencySymbol}</span>
          </p>
        </div>
      </Card>
      <Card className="flex items-start p-4 bg-red-50 dark:bg-red-900/50 border-red-200 dark:border-red-800">
        <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center bg-red-100 dark:bg-red-800 rounded-full">
            <ArrowDownIcon className="w-6 h-6 text-red-600 dark:text-red-300" />
        </div>
        <div className="mr-4">
          <p className="text-sm font-medium text-red-600 dark:text-red-300">هزینه کل</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">
            {formatCurrency(totalExpenses)} <span className="text-sm font-normal">{currencySymbol}</span>
          </p>
        </div>
      </Card>
      <Card className="flex items-start p-4 bg-blue-50 dark:bg-blue-900/50 border-blue-200 dark:border-blue-800">
        <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center bg-blue-100 dark:bg-blue-800 rounded-full">
            <BanknotesIcon className="w-6 h-6 text-blue-600 dark:text-blue-300" />
        </div>
        <div className="mr-4">
          <p className="text-sm font-medium text-blue-600 dark:text-blue-300">موجودی فعلی</p>
          <p className={`text-2xl font-bold ${balance >= 0 ? 'text-gray-900 dark:text-white' : 'text-red-600 dark:text-red-400'}`}>
            {formatCurrency(balance)} <span className="text-sm font-normal">{currencySymbol}</span>
          </p>
        </div>
      </Card>
    </div>
  );
};

export default Summary;
