import React from 'react';
import { ChartPieIcon, Cog6ToothIcon } from './icons/Icons';

interface HeaderProps {
    activeView: 'dashboard' | 'settings';
    setActiveView: (view: 'dashboard' | 'settings') => void;
    serverStatus: 'online' | 'offline' | 'checking';
}

export const Header: React.FC<HeaderProps> = ({ activeView, setActiveView, serverStatus }) => {
    
    const navButtonClasses = (view: 'dashboard' | 'settings') => 
        `flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md transition-colors ${
            activeView === view
            ? 'bg-blue-600 text-white'
            : 'text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
        }`;

    const getStatusColor = () => {
        switch(serverStatus) {
            case 'online': return 'bg-green-500';
            case 'offline': return 'bg-red-500';
            default: return 'bg-yellow-500';
        }
    };

    const getStatusText = () => {
        switch(serverStatus) {
            case 'online': return 'متصل به سرور';
            case 'offline': return 'عدم ارتباط با سرور';
            default: return 'در حال بررسی...';
        }
    };

    return (
        <header className="bg-white dark:bg-gray-800 shadow-sm sticky top-0 z-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center gap-4">
                         <h1 className="text-xl font-bold text-blue-600 dark:text-blue-400 hidden sm:block">مدیر هزینه</h1>
                         <div className="flex items-center gap-2 text-xs bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-full" title={getStatusText()}>
                            <span className={`w-2.5 h-2.5 rounded-full ${getStatusColor()} animate-pulse`}></span>
                            <span className="text-gray-600 dark:text-gray-300 hidden sm:inline">{getStatusText()}</span>
                         </div>
                    </div>
                    <nav className="flex items-center gap-2">
                        <button onClick={() => setActiveView('dashboard')} className={navButtonClasses('dashboard')}>
                            <ChartPieIcon className="w-5 h-5" />
                            <span className="hidden sm:inline">داشبورد</span>
                        </button>
                        <button onClick={() => setActiveView('settings')} className={navButtonClasses('settings')}>
                             <Cog6ToothIcon className="w-5 h-5" />
                            <span className="hidden sm:inline">تنظیمات</span>
                        </button>
                    </nav>
                </div>
            </div>
        </header>
    );
};