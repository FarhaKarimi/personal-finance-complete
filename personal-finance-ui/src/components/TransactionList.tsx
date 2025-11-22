
import React from 'react';
import { Transaction, TransactionType } from '../types';
import { PencilIcon, TrashIcon } from './icons/Icons';

interface TransactionListProps {
  transactions: Transaction[];
  onEdit: (transaction: Transaction) => void;
  onDelete: (id: string) => void;
  currencySymbol: string;
}

const TransactionList: React.FC<TransactionListProps> = ({ transactions, onEdit, onDelete, currencySymbol }) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('fa-IR').format(amount);
  };

  if (transactions.length === 0) {
    return <div className="text-center py-8 text-gray-500 dark:text-gray-400">هیچ تراکنشی برای نمایش وجود ندارد.</div>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead className="bg-gray-50 dark:bg-gray-800">
          <tr>
            <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">نوع</th>
            <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">مبلغ</th>
            <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">دسته</th>
            <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">تاریخ</th>
            <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">توضیحات</th>
            <th scope="col" className="relative px-6 py-3">
              <span className="sr-only">عملیات</span>
            </th>
          </tr>
        </thead>
        <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
          {transactions.map((t) => (
            <tr key={t.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${t.type === TransactionType.INCOME ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'}`}>
                  {t.type === TransactionType.INCOME ? 'درآمد' : 'هزینه'}
                </span>
              </td>
              <td className={`px-6 py-4 whitespace-nowrap font-medium ${t.type === TransactionType.INCOME ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                {formatCurrency(t.amount)} <span className="text-xs text-gray-500">{currencySymbol}</span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{t.category.name}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{new Date(t.date).toLocaleDateString('fa-IR')}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400 max-w-xs truncate">{t.description}</td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <div className="flex items-center justify-end gap-2">
                    <button onClick={() => onEdit(t)} className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300" title="ویرایش">
                        <PencilIcon className="w-5 h-5"/>
                    </button>
                    <button onClick={() => window.confirm('آیا از حذف این تراکنش مطمئن هستید؟') && onDelete(t.id)} className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300" title="حذف">
                        <TrashIcon className="w-5 h-5"/>
                    </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionList;
