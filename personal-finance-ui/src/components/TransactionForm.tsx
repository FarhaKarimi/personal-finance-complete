
import React, { useState, useEffect } from 'react';
import { Transaction, Category, TransactionType } from '../types';
import Card from './ui/Card';

interface TransactionFormProps {
  onSubmit: (transaction: Omit<Transaction, 'id'>) => Promise<void>;
  categories: Category[];
  addCategory: (category: Omit<Category, 'id'>) => Promise<Category>;
  initialData?: Transaction | null;
  onCancelEdit?: () => void;
}

const TransactionForm: React.FC<TransactionFormProps> = ({ onSubmit, categories, addCategory, initialData, onCancelEdit }) => {
  const [type, setType] = useState<TransactionType>(TransactionType.EXPENSE);
  const [amount, setAmount] = useState<string>('');
  const [categoryId, setCategoryId] = useState<string>('');
  const [date, setDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [description, setDescription] = useState<string>('');
  const [isAddingCategory, setIsAddingCategory] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (initialData) {
      setType(initialData.type);
      setAmount(String(initialData.amount));
      setCategoryId(initialData.category.id);
      setDate(initialData.date);
      setDescription(initialData.description);
    } else {
        resetForm();
    }
  }, [initialData]);

  const filteredCategories = categories.filter(c => c.type === type);

  useEffect(() => {
    if(!initialData && filteredCategories.length > 0 && !filteredCategories.some(c => c.id === categoryId)) {
        setCategoryId(filteredCategories[0].id);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type, categories, initialData]);

  const handleAddNewCategory = async () => {
    if (newCategoryName.trim() !== '') {
        setIsSubmitting(true);
        try {
            const newCategory = await addCategory({ name: newCategoryName, type: type });
            setCategoryId(newCategory.id);
            setNewCategoryName('');
            setIsAddingCategory(false);
        } catch (error) {
            console.error("Failed to add category", error);
        } finally {
            setIsSubmitting(false);
        }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const category = categories.find(c => c.id === categoryId);
    if (amount && categoryId && date && category) {
      setIsSubmitting(true);
      try {
        await onSubmit({
            type,
            amount: parseFloat(amount),
            category,
            date,
            description,
        });
        if (!initialData) {
            resetForm();
        }
      } finally {
        setIsSubmitting(false);
      }
    } else {
        alert("لطفا تمام فیلدهای ضروری را پر کنید.");
    }
  };
  
  const resetForm = () => {
    setType(TransactionType.EXPENSE);
    setAmount('');
    // انتخاب پیش‌فرض اولین دسته در صورت وجود
    const defaultCat = categories.filter(c => c.type === TransactionType.EXPENSE)[0];
    setCategoryId(defaultCat ? defaultCat.id : '');
    setDate(new Date().toISOString().split('T')[0]);
    setDescription('');
  }

  return (
    <Card>
      <h2 className="text-xl font-semibold mb-4">{initialData ? 'ویرایش تراکنش' : 'افزودن تراکنش جدید'}</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <div className="flex border border-gray-300 dark:border-gray-600 rounded-md">
            <button type="button" onClick={() => setType(TransactionType.INCOME)} className={`w-1/2 p-2 rounded-r-md transition ${type === TransactionType.INCOME ? 'bg-green-500 text-white' : 'bg-gray-200 dark:bg-gray-700'}`}>درآمد</button>
            <button type="button" onClick={() => setType(TransactionType.EXPENSE)} className={`w-1/2 p-2 rounded-l-md transition ${type === TransactionType.EXPENSE ? 'bg-red-500 text-white' : 'bg-gray-200 dark:bg-gray-700'}`}>هزینه</button>
          </div>
        </div>
        <div>
          <label htmlFor="amount" className="block text-sm font-medium text-gray-700 dark:text-gray-300">مبلغ</label>
          <input type="number" id="amount" value={amount} onChange={(e) => setAmount(e.target.value)} required className="mt-1 block w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
        </div>
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700 dark:text-gray-300">دسته بندی</label>
          {isAddingCategory ? (
            <div className="flex gap-2 mt-1">
                <input type="text" value={newCategoryName} onChange={e => setNewCategoryName(e.target.value)} placeholder="نام دسته جدید" className="block w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"/>
                <button type="button" onClick={handleAddNewCategory} disabled={isSubmitting} className="px-3 py-2 bg-blue-600 text-white rounded-md text-sm disabled:opacity-50">
                    {isSubmitting ? '...' : 'افزودن'}
                </button>
                <button type="button" onClick={() => setIsAddingCategory(false)} className="px-3 py-2 bg-gray-300 dark:bg-gray-600 text-gray-800 dark:text-gray-200 rounded-md text-sm">لغو</button>
            </div>
          ) : (
             <div className="flex gap-2 mt-1">
                <select id="category" value={categoryId} onChange={(e) => setCategoryId(e.target.value)} required className="block w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500">
                  <option value="" disabled>یک دسته انتخاب کنید</option>
                  {filteredCategories.map(cat => <option key={cat.id} value={cat.id}>{cat.name}</option>)}
                </select>
                <button type="button" title="افزودن دسته جدید" onClick={() => setIsAddingCategory(true)} className="p-2 bg-gray-200 dark:bg-gray-600 rounded-md">+</button>
             </div>
          )}
        </div>
        <div>
          <label htmlFor="date" className="block text-sm font-medium text-gray-700 dark:text-gray-300">تاریخ</label>
          <input type="date" id="date" value={date} onChange={(e) => setDate(e.target.value)} required className="mt-1 block w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
        </div>
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300">توضیحات (اختیاری)</label>
          <input type="text" id="description" value={description} onChange={(e) => setDescription(e.target.value)} className="mt-1 block w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
        </div>
        <div className="flex gap-2 justify-end">
            {initialData && <button type="button" onClick={onCancelEdit} className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">لغو</button>}
            <button type="submit" disabled={isSubmitting} className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed">
                {isSubmitting ? 'در حال انجام...' : (initialData ? 'ذخیره تغییرات' : 'افزودن')}
            </button>
        </div>
      </form>
    </Card>
  );
};

export default TransactionForm;
