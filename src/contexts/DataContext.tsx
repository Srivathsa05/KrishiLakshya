import React, { createContext, useContext, useEffect, useState } from 'react';
import { Crop } from '../models/Crop';
import { Expense } from '../models/Expense';
import { Income } from '../models/Income';
import { useAuth } from './AuthContext';

interface InventoryItem {
  id: string;
  type: string;
  quantity: number;
  unit: string;
  threshold: number;
  cropId?: string;
  createdAt: Date;
  updatedAt: Date;
}

interface DataContextType {
  crops: Crop[];
  expenses: Expense[];
  incomes: Income[];
  inventory: InventoryItem[];
  addCrop: (crop: Omit<Crop, 'id' | 'userId' | 'createdAt' | 'updatedAt'>) => Promise<Crop>;
  addExpense: (expense: Omit<Expense, 'id' | 'userId' | 'createdAt' | 'updatedAt'>) => Promise<Expense>;
  addIncome: (income: Omit<Income, 'id' | 'userId' | 'createdAt' | 'updatedAt'>) => Promise<Income>;
  addInventoryItem: (item: Omit<InventoryItem, 'id' | 'createdAt' | 'updatedAt'>) => Promise<InventoryItem>;
  getTotalExpenses: (cropId?: string) => number;
  getTotalIncome: (cropId?: string) => number;
  getProfit: (cropId?: string) => number;
  getLowStockItems: () => InventoryItem[];
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const useData = (): DataContextType => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();

  const [crops, setCrops] = useState<Crop[]>([]);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [incomes, setIncomes] = useState<Income[]>([]);
  const [inventory, setInventory] = useState<InventoryItem[]>([]);

  useEffect(() => {
    if (user && crops.length === 0) {
      const sampleCrops: Crop[] = [
        {
          id: '1',
          userId: user.id,
          name: 'Wheat',
          type: 'Grain',
          area: 10,
          areaUnit: 'acre',
          plantingDate: new Date(),
          season: 'Rabi',
          status: 'active',
          expectedHarvestDate: new Date(),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: '2',
          userId: user.id,
          name: 'Tomato',
          type: 'Vegetable',
          area: 5,
          areaUnit: 'acre',
          plantingDate: new Date(),
          season: 'Kharif',
          status: 'active',
          expectedHarvestDate: new Date(),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];
      setCrops(sampleCrops);
    }
  }, [user, crops]);

  const addCrop = async (
    cropData: Omit<Crop, 'id' | 'userId' | 'createdAt' | 'updatedAt'>
  ): Promise<Crop> => {
    if (!user) throw new Error('User must be logged in');
    const newCrop: Crop = {
      id: Date.now().toString(),
      userId: user.id,
      ...cropData,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setCrops((prev) => [...prev, newCrop]);
    return newCrop;
  };

  const addExpense = async (
    expenseData: Omit<Expense, 'id' | 'userId' | 'createdAt' | 'updatedAt'>
  ): Promise<Expense> => {
    if (!user) throw new Error('User must be logged in');
    const newExpense: Expense = {
      id: Date.now().toString(),
      userId: user.id,
      ...expenseData,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setExpenses((prev) => [...prev, newExpense]);
    return newExpense;
  };

  const addIncome = async (
    incomeData: Omit<Income, 'id' | 'userId' | 'createdAt' | 'updatedAt'>
  ): Promise<Income> => {
    if (!user) throw new Error('User must be logged in');
    const newIncome: Income = {
      id: Date.now().toString(),
      userId: user.id,
      ...incomeData,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setIncomes((prev) => [...prev, newIncome]);
    return newIncome;
  };

  const addInventoryItem = async (
    itemData: Omit<InventoryItem, 'id' | 'createdAt' | 'updatedAt'>
  ): Promise<InventoryItem> => {
    if (!user) throw new Error('User must be logged in');
    const newItem: InventoryItem = {
      id: Date.now().toString(),
      ...itemData,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setInventory((prev) => [...prev, newItem]);
    return newItem;
  };

  const getLowStockItems = (): InventoryItem[] => {
    return inventory.filter((item) => item.quantity <= item.threshold);
  };

  const getTotalExpenses = (cropId?: string): number => {
    return expenses
      .filter((e) => !cropId || e.cropId === cropId)
      .reduce((sum, e) => sum + e.amount, 0);
  };

  const getTotalIncome = (cropId?: string): number => {
    return incomes
      .filter((i) => !cropId || i.cropId === cropId)
      .reduce((sum, i) => sum + i.amount, 0);
  };

  const getProfit = (cropId?: string): number => {
    return getTotalIncome(cropId) - getTotalExpenses(cropId);
  };

  const value: DataContextType = {
    crops,
    expenses,
    incomes,
    inventory,
    addCrop,
    addExpense,
    addIncome,
    addInventoryItem,
    getTotalExpenses,
    getTotalIncome,
    getProfit,
    getLowStockItems,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};
