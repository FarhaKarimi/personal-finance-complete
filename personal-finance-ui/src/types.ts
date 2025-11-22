
export enum TransactionType {
  INCOME = 'income',
  EXPENSE = 'expense',
}

export interface Category {
  id: string;
  name: string;
  type: TransactionType;
}

export interface Transaction {
  id: string;
  type: TransactionType;
  amount: number;
  category: Category;
  date: string;
  description: string;
}

// DTOs (Data Transfer Objects) for API Requests
export interface CreateTransactionRequest {
  type: TransactionType;
  amount: number;
  categoryId: string; // Send ID instead of full object
  date: string;
  description: string;
}

export interface CreateCategoryRequest {
  name: string;
  type: TransactionType;
}

export enum ChartType {
  BAR = 'bar',
  PIE = 'pie',
  LINE = 'line',
}

export interface Settings {
  currency: string;
  chartType: ChartType;
}
