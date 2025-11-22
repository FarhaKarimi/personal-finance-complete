
import React, { useMemo } from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import { Transaction, TransactionType, ChartType } from '../types';

interface FinanceChartProps {
  transactions: Transaction[];
  type: ChartType;
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d', '#ffc658'];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white dark:bg-gray-800 p-2 border border-gray-200 dark:border-gray-700 rounded-md shadow-sm">
        <p className="label font-semibold">{`${label}`}</p>
        <p className="intro text-blue-600 dark:text-blue-400">{`مبلغ : ${new Intl.NumberFormat('fa-IR').format(payload[0].value)}`}</p>
      </div>
    );
  }
  return null;
};


const FinanceChart: React.FC<FinanceChartProps> = ({ transactions, type }) => {
  const chartData = useMemo(() => {
    const expenseTransactions = transactions.filter(t => t.type === TransactionType.EXPENSE);
    const dataMap = new Map<string, number>();

    expenseTransactions.forEach(t => {
      const currentAmount = dataMap.get(t.category.name) || 0;
      dataMap.set(t.category.name, currentAmount + t.amount);
    });

    return Array.from(dataMap.entries()).map(([name, value]) => ({ name, value }));
  }, [transactions]);

  if (chartData.length === 0) {
    return <div className="text-center py-10 text-gray-500 dark:text-gray-400">داده‌ای برای نمایش نمودار وجود ندارد.</div>;
  }

  const renderChart = () => {
    switch (type) {
      case ChartType.BAR:
        return (
          <BarChart data={chartData} layout="vertical" margin={{ top: 5, right: 20, left: 20, bottom: 5 }}>
            <XAxis type="number" tickFormatter={(value) => new Intl.NumberFormat('fa-IR').format(value as number)} />
            <YAxis type="category" dataKey="name" width={80} />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(206, 212, 218, 0.2)' }} />
            <Legend />
            <Bar dataKey="value" name="هزینه" fill="#3b82f6" />
          </BarChart>
        );
      case ChartType.LINE:
        return (
           <LineChart data={chartData} margin={{ top: 5, right: 20, left: 20, bottom: 5 }}>
            <XAxis dataKey="name" />
            <YAxis tickFormatter={(value) => new Intl.NumberFormat('fa-IR').format(value as number)} />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Line type="monotone" dataKey="value" name="هزینه" stroke="#3b82f6" activeDot={{ r: 8 }} />
          </LineChart>
        );
      case ChartType.PIE:
      default:
        return (
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={110}
              fill="#8884d8"
              dataKey="value"
              nameKey="name"
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend />
          </PieChart>
        );
    }
  };

  return (
    <div style={{ width: '100%', height: 350 }}>
      <ResponsiveContainer>
        {renderChart()}
      </ResponsiveContainer>
    </div>
  );
};

export default FinanceChart;
