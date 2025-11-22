# Personal Finance Management System - Complete Setup Guide

## 🎯 System Overview

این سیستم شامل دو بخش اصلی است:

1. **Frontend (React + TypeScript + Vite)**: رابط کاربری برای مدیریت مالی شخصی
2. **Backend (Spring Boot + PostgreSQL)**: API و پایگاه داده برای ذخیره اطلاعات

## 🛠️ Prerequisites (پیش‌نیازها)

### Backend Requirements:
- Java 17+ 
- Maven 3.8+
- PostgreSQL 12+
- PostgreSQL JDBC Driver

### Frontend Requirements:
- Node.js 20+ (توصیه می‌شود)
- npm یا yarn

## 📋 Setup Instructions

### 1. Database Setup (راه‌اندازی پایگاه داده)

```sql
-- ایجاد پایگاه داده
CREATE DATABASE personal_finance;

-- اتصال به پایگاه داده
\c personal_finance;

-- اجرای اسکریپت ایجاد جدول (از فایل database-setup.sql)
\i database-setup.sql
```

### 2. Backend Setup (راه‌اندازی بک‌اند)

```bash
# بروید به پوشه بک‌اند
cd personal-finance-backend

# ویرایش application.properties برای تنظیم اطلاعات دیتابیس
nano src/main/resources/application.properties

# اجرای بک‌اند
mvn spring-boot:run
```

**توجه**: در `application.properties` اطلاعات PostgreSQL خود را وارد کنید:
```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/personal_finance
spring.datasource.username=YOUR_USERNAME
spring.datasource.password=YOUR_PASSWORD
```

### 3. Frontend Setup (راه‌اندازی فرانت‌اند)

```bash
# بروید به پوشه فرانت‌اند
cd personal-finance-ui

# نصب dependencies
npm install

# اجرای توسعه (پورت 5173)
npm run dev

# یا بیلد برای production
npm run build
```

**توجه**: Frontend روی پورت 5173 اجرا می‌شود (Vite پیش‌فرض)

## 🔧 Configuration (پیکربندی)

### Backend Configuration:
- **Port**: 8080 (پیش‌فرض)
- **CORS**: فعال برای `http://localhost:5173`
- **API Prefix**: `/api/*`

### Frontend Configuration:
- **Default API URL**: `http://localhost:8080`
- **Dev Server Port**: 5173 (Vite پیش‌فرض)
- **Build Output**: `dist/` folder

## 📡 API Endpoints

### Categories (دسته‌بندی‌ها):
- `GET /api/categories` - دریافت تمام دسته‌بندی‌ها
- `GET /api/categories/{id}` - دریافت دسته‌بندی با آی‌دی
- `POST /api/categories` - ایجاد دسته‌بندی جدید
- `PUT /api/categories/{id}` - ویرایش دسته‌بندی
- `DELETE /api/categories/{id}` - حذف دسته‌بندی

### Transactions (تراکنش‌ها):
- `GET /api/transactions` - دریافت تمام تراکنش‌ها
- `GET /api/transactions/{id}` - دریافت تراکنش با آی‌دی
- `POST /api/transactions` - ایجاد تراکنش جدید
- `PUT /api/transactions/{id}` - ویرایش تراکنش
- `DELETE /api/transactions/{id}` - حذف تراکنش

### Summary (خلاصه):
- `GET /api/summary` - دریافت خلاصه مالی

## 🎨 Features (ویژگی‌ها)

### Frontend Features:
- ✅ مدیریت تراکنش‌ها (ایجاد، ویرایش، حذف)
- ✅ مدیریت دسته‌بندی‌ها 
- ✅ نمایش خلاصه مالی
- ✅ نمودارهای تعاملی (Chart.js)
- ✅ طراحی ریسپانسیو
- ✅ پشتیبانی از تم تیره/روشن
- ✅ ذخیره تنظیمات در localStorage

### Backend Features:
- ✅ RESTful API با Spring Boot
- ✅ JPA/Hibernate برای ORM
- ✅ PostgreSQL Database
- ✅ Bean Validation
- ✅ Exception Handling
- ✅ CORS Configuration
- ✅ Proper HTTP Status Codes

## 🔍 Troubleshooting (راهنمای حل مشکلات)

### Common Issues:

1. **CORS Error**: 
   - اطمینان حاصل کنید که بک‌اند روی پورت 8080 اجرا می‌شود
   - CORS در بک‌اند برای localhost:5173 فعال است

2. **Database Connection Error**:
   - PostgreSQL را بررسی کنید که در حال اجرا باشد
   - اطلاعات اتصال در application.properties را چک کنید

3. **Port Already in Use**:
   ```bash
   # پیدا کردن process روی پورت 8080
   lsof -i :8080
   # یا
   netstat -tulpn | grep 8080
   ```

4. **Frontend Build Issues**:
   - Node.js version را به 20+ ارتقا دهید
   - پوشه node_modules را پاک کنید و دوباره npm install کنید

## 📁 Project Structure

```
personal-finance-system/
├── personal-finance-backend/          # Spring Boot Backend
│   ├── src/main/java/com/finance/
│   │   ├── controller/               # REST Controllers
│   │   ├── service/                  # Business Logic
│   │   ├── repository/               # Data Access
│   │   ├── entity/                   # JPA Entities
│   │   ├── dto/                      # Data Transfer Objects
│   │   └── exception/                # Exception Handling
│   ├── src/main/resources/
│   │   └── application.properties    # Database Config
│   └── pom.xml                       # Maven Dependencies
│
├── personal-finance-ui/               # React Frontend
│   ├── src/
│   │   ├── components/               # React Components
│   │   ├── services/                 # API Services
│   │   ├── types/                    # TypeScript Types
│   │   ├── hooks/                    # Custom Hooks
│   │   └── App.tsx                   # Main App
│   ├── package.json                  # NPM Dependencies
│   └── vite.config.ts               # Vite Configuration
│
└── README-Complete-Setup.md          # This file
```

## 🚀 Quick Start

1. **Start PostgreSQL**:
   ```bash
   sudo systemctl start postgresql
   ```

2. **Setup Database**:
   ```sql
   createdb personal_finance
   ```

3. **Start Backend**:
   ```bash
   cd personal-finance-backend
   mvn spring-boot:run
   ```

4. **Start Frontend** (in new terminal):
   ```bash
   cd personal-finance-ui
   npm install
   npm run dev
   ```

5. **Open Browser**: 
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:8080/api/categories

## 📝 Testing (تست)

برای تست API می‌توانید از فایل Postman collection استفاده کنید:
- `Personal-Finance-API.postman_collection.json` (در بک‌اند)
- `ULti2-Postman-Tests.json` (تست‌های کامل)

## 🔧 Development Tips

### Backend Development:
- بک‌اند خودش روی port 8080 اجرا می‌شود
- برای debug کردن، از IntelliJ IDEA یا Eclipse استفاده کنید
- دیتابیس H2 برای development سریع موجود است (در application.properties)

### Frontend Development:
- Hot reload فعال است - تغییرات بلافاصله اعمال می‌شوند
- TypeScript برای type safety استفاده می‌شود
- Tailwind CSS برای styling

## 📞 Support

در صورت بروز مشکل، لطفاً:

1. Logs را چک کنید (Console در browser برای frontend، terminal برای backend)
2. اطمینان حاصل کنید که تمام پیش‌نیازها نصب شده‌اند
3. پورت‌ها در حال استفاده توسط برنامه‌های دیگر نباشند

---

**Created by**: MiniMax Agent  
**Version**: 2.0 - Synchronized Frontend & Backend  
**Last Updated**: 2025-11-19