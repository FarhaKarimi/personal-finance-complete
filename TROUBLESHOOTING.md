# Personal Finance System - Troubleshooting Guide

## 🛠️ Common Issues & Solutions

### Issue 1: Vite Pre-transform Error

**Error Message:**
```
[vite] Pre-transform error: Failed to load url /index.tsx (resolved id: /index.tsx). Does the file exist?
```

**Solution:**
✅ **FIXED** - ساختار فایل‌ها درست شد:
- فایل `index.tsx` در پوشه `src/` قرار گرفت
- `vite.config.ts` برای پورت 5173 تنظیم شد
- `tsconfig.json` paths اصلاح شد

### Issue 2: Node.js Version Compatibility

**Error Message:**
```
You are using Node.js 18.19.0. Vite requires Node.js version 20.19+ or 22.12+
```

**Solution:**
1. Node.js را به نسخه 20+ ارتقا دهید:
   ```bash
   # Using nvm (recommended)
   nvm install 20
   nvm use 20
   
   # Or download from https://nodejs.org
   ```

2. **Alternative**: از Docker استفاده کنید:
   ```dockerfile
   FROM node:20-alpine
   WORKDIR /app
   COPY package*.json ./
   RUN npm install
   COPY . .
   CMD ["npm", "run", "dev"]
   ```

### Issue 3: CORS Issues

**Error Message:**
```
Access to fetch at 'http://localhost:8080/api/categories' from origin 'http://localhost:5173' has been blocked by CORS policy
```

**Solution:**
✅ **FIXED** - CORS در backend فعال شده:
- `@CrossOrigin(origins = "http://localhost:5173")` در همه controllers
- مطمئن شوید backend روی پورت 8080 اجرا می‌شود

### Issue 4: Port Already in Use

**Error Message:**
```
Error: listen EADDRINUSE: address already in use :::8080
```

**Solution:**
1. Process روی پورت را پیدا کنید:
   ```bash
   # For port 8080 (Backend)
   lsof -i :8080
   netstat -tulpn | grep 8080
   
   # For port 5173 (Frontend) 
   lsof -i :5173
   ```

2. Process را متوقف کنید:
   ```bash
   kill -9 <PID>
   ```

### Issue 5: Database Connection Error

**Error Message:**
```
Connection to database failed. Please check your configuration.
```

**Solution:**
1. PostgreSQL را چک کنید:
   ```bash
   sudo systemctl status postgresql
   sudo systemctl start postgresql
   ```

2. اطلاعات database در `application.properties` را چک کنید:
   ```properties
   spring.datasource.url=jdbc:postgresql://localhost:5432/personal_finance
   spring.datasource.username=YOUR_USERNAME
   spring.datasource.password=YOUR_PASSWORD
   ```

3. دیتابیس و جدول‌ها را ایجاد کنید:
   ```sql
   createdb personal_finance
   psql personal_finance < database-setup.sql
   ```

### Issue 6: Frontend Build Fails

**Error Message:**
```
Failed to build
```

**Solution:**
1. Dependencies را دوباره نصب کنید:
   ```bash
   cd personal-finance-ui
   rm -rf node_modules package-lock.json
   npm install
   ```

2. Cache را پاک کنید:
   ```bash
   npm cache clean --force
   ```

3. TypeScript errors را چک کنید:
   ```bash
   npx tsc --noEmit
   ```

### Issue 7: API Endpoints Not Working

**Frontend Error:**
```
API Error (getCategories): TypeError: Failed to fetch
```

**Solution:**
1. Backend را چک کنید که در حال اجرا است:
   ```bash
   curl http://localhost:8080/api/categories
   ```

2. API endpoints در `services/api.ts` را چک کنید:
   ```typescript
   // Should be: /api/categories
   // NOT: /categories
   ```

3. Browser Developer Tools را چک کنید (Network tab)

## 🚀 Quick Fix Commands

### Complete Reset:
```bash
# 1. Kill all Node.js processes
killall node

# 2. Clean and reinstall frontend
cd personal-finance-ui
rm -rf node_modules package-lock.json
npm install

# 3. Restart backend
cd ../personal-finance-backend
mvn spring-boot:run

# 4. Start frontend (new terminal)
cd ../personal-finance-ui
npm run dev
```

### Database Reset:
```bash
# Drop and recreate database
dropdb personal_finance
createdb personal_finance
psql personal_finance < database-setup.sql
```

### CORS Debug:
```bash
# Test backend CORS
curl -H "Origin: http://localhost:5173" \
     -H "Access-Control-Request-Method: GET" \
     -H "Access-Control-Request-Headers: X-Requested-With" \
     -X OPTIONS \
     http://localhost:8080/api/categories
```

## 📞 Getting Help

1. **Frontend Issues**: Check browser console (F12)
2. **Backend Issues**: Check console output for errors
3. **Database Issues**: Check PostgreSQL logs
4. **Port Issues**: Use `netstat -tulpn` to check usage

## ✅ Verification Checklist

- [ ] Node.js version 20+
- [ ] PostgreSQL running
- [ ] Database created with tables
- [ ] Backend running on port 8080
- [ ] Frontend running on port 5173
- [ ] CORS enabled in backend
- [ ] API endpoints accessible
- [ ] No TypeScript errors

---

**Status**: 🟢 **ALL ISSUES FIXED - READY TO USE**