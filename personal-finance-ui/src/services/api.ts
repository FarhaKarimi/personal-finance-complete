
import { Transaction, Category, CreateTransactionRequest, CreateCategoryRequest } from '../types';

const DEFAULT_API_URL = (import.meta as any).env?.VITE_API_URL || 'http://localhost:8080';

export const getBaseUrl = () => {
  return localStorage.getItem('api_base_url') || DEFAULT_API_URL;
};

export const setBaseUrl = (url: string) => {
  // Remove trailing slash if present
  const cleanUrl = url.replace(/\/$/, "");
  localStorage.setItem('api_base_url', cleanUrl);
};

const getHeaders = () => ({
  'Content-Type': 'application/json',
  'Accept': 'application/json',
});

class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = 'ApiError';
  }
}

const handleResponse = async (response: Response) => {
  if (!response.ok) {
    let errorMessage = `HTTP error! status: ${response.status}`;
    try {
      const errorBody = await response.json();
      errorMessage = errorBody.message || errorBody.error || JSON.stringify(errorBody);
    } catch (e) {
      // If JSON parse fails, try text
      try {
        const text = await response.text();
        if (text) errorMessage = text;
      } catch (textError) {
         // Ignore text parsing error
      }
    }
    throw new ApiError(response.status, errorMessage);
  }
  
  if (response.status === 204) return null;
  return response.json();
};

export const api = {
  // --- Utilities ---
  checkConnection: async (): Promise<boolean> => {
    try {
      // Changed from HEAD to GET because some simple backends don't implement HEAD handlers
      // fetching categories is usually lightweight enough for a health check
      const res = await fetch(`${getBaseUrl()}/api/categories`, { 
        method: 'GET', 
        headers: getHeaders() 
      });
      return res.ok;
    } catch (e) {
      console.warn("Connection check failed:", e);
      return false;
    }
  },

  // --- Transactions ---
  getTransactions: async (): Promise<Transaction[]> => {
    try {
      const response = await fetch(`${getBaseUrl()}/api/transactions`, { headers: getHeaders() });
      return handleResponse(response);
    } catch (error) {
      console.error("API Error (getTransactions):", error);
      throw error;
    }
  },

  createTransaction: async (transaction: CreateTransactionRequest): Promise<Transaction> => {
    const response = await fetch(`${getBaseUrl()}/api/transactions`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(transaction),
    });
    return handleResponse(response);
  },

  updateTransaction: async (id: string, transaction: CreateTransactionRequest): Promise<Transaction> => {
    const response = await fetch(`${getBaseUrl()}/api/transactions/${id}`, {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify(transaction),
    });
    return handleResponse(response);
  },

  deleteTransaction: async (id: string): Promise<void> => {
    const response = await fetch(`${getBaseUrl()}/api/transactions/${id}`, {
      method: 'DELETE',
      headers: getHeaders(),
    });
    return handleResponse(response);
  },

  // --- Categories ---
  getCategories: async (): Promise<Category[]> => {
    try {
        const response = await fetch(`${getBaseUrl()}/api/categories`, { headers: getHeaders() });
        return handleResponse(response);
    } catch (error) {
        console.error("API Error (getCategories):", error);
        throw error;
    }
  },

  createCategory: async (category: CreateCategoryRequest): Promise<Category> => {
    const response = await fetch(`${getBaseUrl()}/api/categories`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(category),
    });
    return handleResponse(response);
  },

  updateCategory: async (category: Category): Promise<Category> => {
    const response = await fetch(`${getBaseUrl()}/api/categories/${category.id}`, {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify({ name: category.name, type: category.type }),
    });
    return handleResponse(response);
  },

  deleteCategory: async (id: string): Promise<void> => {
    const response = await fetch(`${getBaseUrl()}/api/categories/${id}`, {
      method: 'DELETE',
      headers: getHeaders(),
    });
    return handleResponse(response);
  },
};
