
import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { useLocalStorage } from './hooks/useLocalStorage';
import { Transaction, Category, Settings, ChartType, CreateTransactionRequest } from './types';
import { CURRENCY_OPTIONS } from './constants';
import Dashboard from './components/Dashboard';
import SettingsPage from './components/SettingsPage';
import { Header } from './components/Header';
import { api, getBaseUrl } from './services/api';

const App: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  
  const [settings, setSettings] = useLocalStorage<Settings>('settings', {
    currency: 'IRR',
    chartType: ChartType.PIE,
  });

  const [activeView, setActiveView] = useState<'dashboard' | 'settings'>('dashboard');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [serverStatus, setServerStatus] = useState<'online' | 'offline' | 'checking'>('checking');

  const currencySymbol = useMemo(() => {
    return CURRENCY_OPTIONS.find(c => c.value === settings.currency)?.label || 'ریال';
  }, [settings.currency]);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    setServerStatus('checking');
    try {
      // We try to fetch categories first as a lighter check
      const categoriesData = await api.getCategories();
      setCategories(categoriesData);

      // Then transactions
      const transactionsData = await api.getTransactions();
      setTransactions(transactionsData);
      
      setServerStatus('online');
    } catch (err: any) {
      console.error("Error fetching data:", err);
      // Show a more descriptive error message
      let msg = err.message || "خطا در برقراری ارتباط با سرور.";
      if (msg === "Failed to fetch") {
        msg = "ارتباط برقرار نشد (Failed to fetch).";
      }
      setError(msg);
      setServerStatus('offline');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // --- توابع مدیریت داده‌ها (CRUD) با API ---

  const addTransaction = async (transaction: Omit<Transaction, 'id'>) => {
    try {
      const requestData: CreateTransactionRequest = {
        amount: transaction.amount,
        date: transaction.date,
        description: transaction.description,
        type: transaction.type,
        categoryId: transaction.category.id
      };

      const savedTransaction = await api.createTransaction(requestData);
      setTransactions(prev => [...prev, savedTransaction]);
      setServerStatus('online');
    } catch (err: any) {
      console.error(err);
      alert(`خطا در ذخیره تراکنش: ${err.message}`);
    }
  };

  const updateTransaction = async (updatedTransaction: Transaction) => {
    try {
      const requestData: CreateTransactionRequest = {
        amount: updatedTransaction.amount,
        date: updatedTransaction.date,
        description: updatedTransaction.description,
        type: updatedTransaction.type,
        categoryId: updatedTransaction.category.id
      };

      const savedTransaction = await api.updateTransaction(updatedTransaction.id, requestData);
      setTransactions(prev => prev.map(t => t.id === savedTransaction.id ? savedTransaction : t));
      setServerStatus('online');
    } catch (err: any) {
      console.error(err);
      alert(`خطا در ویرایش تراکنش: ${err.message}`);
    }
  };

  const deleteTransaction = async (id: string) => {
    try {
      await api.deleteTransaction(id);
      setTransactions(prev => prev.filter(t => t.id !== id));
      setServerStatus('online');
    } catch (err: any) {
      console.error(err);
      alert(`خطا در حذف تراکنش: ${err.message}`);
    }
  };

  const addCategory = async (category: Omit<Category, 'id'>): Promise<Category> => {
    try {
      const savedCategory = await api.createCategory(category);
      setCategories(prev => [...prev, savedCategory]);
      setServerStatus('online');
      return savedCategory;
    } catch (err: any) {
      console.error(err);
      alert(`خطا در افزودن دسته‌بندی: ${err.message}`);
      throw err;
    }
  };

  const updateCategory = async (updatedCategory: Category) => {
    try {
      const savedCategory = await api.updateCategory(updatedCategory);
      setCategories(prev => prev.map(c => c.id === savedCategory.id ? savedCategory : c));
      
      setTransactions(prev => prev.map(t => {
        if (t.category.id === savedCategory.id) {
            return { ...t, category: savedCategory };
        }
        return t;
      }));
      setServerStatus('online');
    } catch (err: any) {
      console.error(err);
      alert(`خطا در ویرایش دسته‌بندی: ${err.message}`);
    }
  };

  const deleteCategory = async (id: string) => {
    const hasTransactions = transactions.some(t => t.category.id === id);
    if (hasTransactions) {
        alert('نمی‌توانید دسته‌ای را که دارای تراکنش است حذف کنید.');
        return;
    }
    try {
      await api.deleteCategory(id);
      setCategories(prev => prev.filter(c => c.id !== id));
      setServerStatus('online');
    } catch (err: any) {
      console.error(err);
      alert(`خطا در حذف دسته‌بندی: ${err.message}`);
    }
  };
  
  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex flex-col justify-center items-center h-64 gap-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <span className="text-gray-600 dark:text-gray-300 animate-pulse">در حال ارتباط با سرور...</span>
        </div>
      );
    }

    if (error && activeView === 'dashboard') {
      return (
        <div className="flex flex-col items-center justify-center h-auto gap-6 py-10 px-4">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 max-w-2xl w-full text-center">
              <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-red-600 dark:text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">ارتباط با سرور برقرار نشد</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6 text-sm leading-relaxed">
                سیستم موفق به دریافت اطلاعات از بک‌اند نشد. لطفا وضعیت سرور را بررسی کنید.
              </p>
              
              {/* Technical Diagnostic Box */}
              <div className="bg-gray-900 rounded-lg p-4 text-left dir-ltr overflow-x-auto shadow-inner mb-6 border border-gray-700">
                <div className="flex items-center justify-between mb-3 border-b border-gray-700 pb-2">
                    <span className="text-xs font-bold font-mono text-gray-400 tracking-wider">DIAGNOSTIC INFO</span>
                    <div className="flex items-center gap-2">
                       <span className="block w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                       <span className="text-xs font-mono text-red-400">CONNECTION FAILED</span>
                    </div>
                </div>
                <pre className="text-xs sm:text-sm font-mono text-green-400 whitespace-pre-wrap break-all leading-relaxed">
{`> Target Server:  ${getBaseUrl()}
> Status:         OFFLINE or BLOCKED
> JS Error:       ${error}

-------------------------------------------------------
POSSIBLE CAUSES & SOLUTIONS:
-------------------------------------------------------
[1] CORS POLICY (Most Likely!)
    If you check Browser Console (F12) and see red text:
    "Access-Control-Allow-Origin"
    -> ACTION: Enable CORS in your Backend code.

[2] WRONG PORT / SERVER DOWN
    If Console says: "ERR_CONNECTION_REFUSED"
    -> ACTION: Check if backend is running on port ${getBaseUrl().split(':').pop()}.
    -> ACTION: Check Settings page to update port.

[3] MIXED CONTENT
    Are you using HTTPS (frontend) with HTTP (backend)?
    -> ACTION: Browsers block this. Use localhost or setup SSL.
`}
                </pre>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button 
                    onClick={fetchData} 
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg transition-colors shadow-md flex items-center justify-center gap-2"
                >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
                    تلاش مجدد
                </button>
                <button 
                    onClick={() => setActiveView('settings')} 
                    className="bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-white font-medium py-2 px-6 rounded-lg transition-colors"
                >
                    تغییر آدرس سرور
                </button>
              </div>
            </div>
        </div>
      );
    }

    return activeView === 'dashboard' ? (
      <Dashboard
        transactions={transactions}
        categories={categories}
        settings={settings}
        currencySymbol={currencySymbol}
        addTransaction={addTransaction}
        updateTransaction={updateTransaction}
        deleteTransaction={deleteTransaction}
        addCategory={addCategory}
      />
    ) : (
      <SettingsPage
        categories={categories}
        settings={settings}
        setSettings={setSettings}
        addCategory={addCategory}
        updateCategory={updateCategory}
        deleteCategory={deleteCategory}
        onRefreshData={fetchData}
      />
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 font-sans transition-colors duration-300">
      <Header activeView={activeView} setActiveView={setActiveView} serverStatus={serverStatus} />
      <main className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
        {renderContent()}
      </main>
    </div>
  );
};

export default App;
