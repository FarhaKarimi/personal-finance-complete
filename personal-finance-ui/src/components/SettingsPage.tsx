
import React, { useState, useEffect } from 'react';
import { Category, Settings, TransactionType, ChartType } from '../types';
import { CURRENCY_OPTIONS } from '../constants';
import Card from './ui/Card';
import { TrashIcon, PencilIcon } from './icons/Icons';
import { getBaseUrl, setBaseUrl } from '../services/api';

interface SettingsPageProps {
  categories: Category[];
  settings: Settings;
  setSettings: React.Dispatch<React.SetStateAction<Settings>>;
  addCategory: (category: Omit<Category, 'id'>) => Promise<Category>;
  updateCategory: (category: Category) => Promise<void>;
  deleteCategory: (id: string) => Promise<void>;
  onRefreshData: () => void;
}

const SettingsPage: React.FC<SettingsPageProps> = ({
  categories,
  settings,
  setSettings,
  addCategory,
  updateCategory,
  deleteCategory,
  onRefreshData
}) => {
  const [newCategoryName, setNewCategoryName] = useState('');
  const [newCategoryType, setNewCategoryType] = useState<TransactionType>(TransactionType.EXPENSE);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  // Server URL State
  const [serverUrl, setServerUrl] = useState(getBaseUrl());
  const [isSavingUrl, setIsSavingUrl] = useState(false);

  const handleAddCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newCategoryName.trim()) {
        setIsLoading(true);
        try {
            if (editingCategory) {
                await updateCategory({ ...editingCategory, name: newCategoryName, type: newCategoryType });
            } else {
                await addCategory({ name: newCategoryName, type: newCategoryType });
            }
            cancelEditing();
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    }
  };

  const startEditing = (category: Category) => {
      setEditingCategory(category);
      setNewCategoryName(category.name);
      setNewCategoryType(category.type);
  };

  const cancelEditing = () => {
      setEditingCategory(null);
      setNewCategoryName('');
      setNewCategoryType(TransactionType.EXPENSE);
  }

  const handleSaveUrl = () => {
      setIsSavingUrl(true);
      setBaseUrl(serverUrl);
      // Give a little feedback
      setTimeout(() => {
          setIsSavingUrl(false);
          onRefreshData(); // Try to fetch data with new URL
          alert('آدرس سرور ذخیره شد و تلاش مجدد برای اتصال انجام شد.');
      }, 500);
  };

  const renderCategoryList = (type: TransactionType) => {
    return categories
      .filter(c => c.type === type)
      .map(cat => (
        <li key={cat.id} className="flex justify-between items-center p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700">
          <span>{cat.name}</span>
          <div className="flex gap-2">
            <button onClick={() => startEditing(cat)} className="text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"><PencilIcon className="w-5 h-5"/></button>
            <button onClick={() => deleteCategory(cat.id)} className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"><TrashIcon className="w-5 h-5"/></button>
          </div>
        </li>
      ));
  };

  return (
    <div className="space-y-8">
      {/* Server Settings */}
      <Card>
          <h2 className="text-xl font-semibold mb-4 border-b pb-2 dark:border-gray-700">تنظیمات اتصال سرور</h2>
          <div className="flex flex-col sm:flex-row gap-4 items-end">
              <div className="w-full sm:flex-grow">
                  <label htmlFor="serverUrl" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">آدرس API بک‌اند</label>
                  <input 
                    id="serverUrl"
                    type="text" 
                    value={serverUrl} 
                    onChange={(e) => setServerUrl(e.target.value)}
                    placeholder="http://localhost:8000"
                    className="w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 dir-ltr text-left"
                  />
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">مثال: http://localhost:8000 یا http://localhost:5000</p>
              </div>
              <button 
                onClick={handleSaveUrl} 
                disabled={isSavingUrl}
                className="w-full sm:w-auto px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                  {isSavingUrl ? 'در حال ذخیره...' : 'ذخیره و تست اتصال'}
              </button>
          </div>
      </Card>

      <Card>
        <h2 className="text-xl font-semibold mb-4">تنظیمات عمومی</h2>
        <div className="space-y-4">
          <div>
            <label htmlFor="currency" className="block text-sm font-medium text-gray-700 dark:text-gray-300">واحد پول</label>
            <select
              id="currency"
              value={settings.currency}
              onChange={(e) => setSettings(s => ({ ...s, currency: e.target.value }))}
              className="mt-1 block w-full sm:w-1/2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              {CURRENCY_OPTIONS.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
            </select>
          </div>
          <div>
            <label htmlFor="chartType" className="block text-sm font-medium text-gray-700 dark:text-gray-300">نوع نمودار پیشفرض</label>
            <select
              id="chartType"
              value={settings.chartType}
              onChange={(e) => setSettings(s => ({ ...s, chartType: e.target.value as ChartType }))}
              className="mt-1 block w-full sm:w-1/2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              <option value={ChartType.PIE}>دایره‌ای</option>
              <option value={ChartType.BAR}>میله‌ای</option>
              <option value={ChartType.LINE}>خطی</option>
            </select>
          </div>
        </div>
      </Card>

      <Card>
        <h2 className="text-xl font-semibold mb-4">مدیریت دسته‌ها</h2>
        <form onSubmit={handleAddCategory} className="mb-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg space-y-3">
            <h3 className="font-medium">{editingCategory ? `ویرایش دسته: ${editingCategory.name}`: 'افزودن دسته جدید'}</h3>
            <div className="flex flex-col sm:flex-row gap-2">
                <input
                    type="text"
                    value={newCategoryName}
                    onChange={(e) => setNewCategoryName(e.target.value)}
                    placeholder="نام دسته"
                    required
                    className="flex-grow bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
                <select value={newCategoryType} onChange={e => setNewCategoryType(e.target.value as TransactionType)} className="bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500">
                    <option value={TransactionType.EXPENSE}>هزینه</option>
                    <option value={TransactionType.INCOME}>درآمد</option>
                </select>
                <div className="flex gap-2">
                    <button type="submit" disabled={isLoading} className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50">
                        {isLoading ? '...' : (editingCategory ? 'ذخیره' : 'افزودن')}
                    </button>
                    {editingCategory && <button type="button" onClick={cancelEditing} className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">لغو</button>}
                </div>
            </div>
        </form>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold mb-2 text-red-600 dark:text-red-400">دسته‌های هزینه</h3>
            <ul className="space-y-1">{renderCategoryList(TransactionType.EXPENSE)}</ul>
          </div>
          <div>
            <h3 className="font-semibold mb-2 text-green-600 dark:text-green-400">دسته‌های درآمد</h3>
            <ul className="space-y-1">{renderCategoryList(TransactionType.INCOME)}</ul>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default SettingsPage;
