
import { Category, TransactionType } from './types';

export const DEFAULT_CATEGORIES: Category[] = [
  { id: 'cat-1', name: 'خوراک', type: TransactionType.EXPENSE },
  { id: 'cat-2', name: 'حمل و نقل', type: TransactionType.EXPENSE },
  { id: 'cat-3', name: 'سرگرمی', type: TransactionType.EXPENSE },
  { id: 'cat-4', name: 'پوشاک', type: TransactionType.EXPENSE },
  { id: 'cat-5', name: 'مسکن', type: TransactionType.EXPENSE },
  { id: 'cat-6', name: 'حقوق', type: TransactionType.INCOME },
  { id: 'cat-7', name: 'فروش', type: TransactionType.INCOME },
];

export const CURRENCY_OPTIONS = [
    { value: 'IRR', label: 'ریال' },
    { value: 'USD', label: 'دلار' },
    { value: 'EUR', label: 'یورو' },
];
