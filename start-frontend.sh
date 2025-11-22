#!/bin/bash

echo "🎨 Personal Finance UI - Frontend Start Script"
echo "============================================="

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 20+ first."
    exit 1
fi

echo "📦 Installing dependencies..."
cd personal-finance-ui

# Check if npm is available
if command -v npm &> /dev/null; then
    echo "Installing with npm..."
    npm install
    echo "🚀 Starting development server..."
    echo "Frontend will start on http://localhost:5173"
    npm run dev
elif command -v yarn &> /dev/null; then
    echo "Installing with yarn..."
    yarn install
    echo "🚀 Starting development server..."
    echo "Frontend will start on http://localhost:5173"
    yarn dev
else
    echo "❌ Neither npm nor yarn is installed."
    exit 1
fi