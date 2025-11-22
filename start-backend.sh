#!/bin/bash

echo "🚀 Personal Finance System - Quick Start Script"
echo "=============================================="

# Check if Java is installed
if ! command -v java &> /dev/null; then
    echo "❌ Java is not installed. Please install Java 17+ first."
    exit 1
fi

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 20+ first."
    exit 1
fi

# Check if PostgreSQL is running
if ! pgrep -x "postgres" > /dev/null; then
    echo "⚠️  PostgreSQL is not running. Starting PostgreSQL..."
    if command -v systemctl &> /dev/null; then
        sudo systemctl start postgresql
    elif command -v service &> /dev/null; then
        sudo service postgresql start
    else
        echo "Please start PostgreSQL manually"
        exit 1
    fi
fi

echo "✅ All prerequisites are satisfied!"

# Start Backend
echo ""
echo "🔧 Starting Backend..."
cd personal-finance-backend
echo "Backend will start on http://localhost:8080"
echo "Press Ctrl+C to stop the backend when done testing"

# Check if Maven is available
if command -v mvn &> /dev/null; then
    echo "Starting with Maven..."
    mvn spring-boot:run
else
    echo "Maven not found. Please install Maven or run backend manually:"
    echo "cd personal-finance-backend && mvn spring-boot:run"
fi