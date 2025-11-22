# Personal Finance Backend API

بک‌اند مدیریت امور مالی شخصی با Spring Boot و PostgreSQL

## پیش‌نیازها

- Java 17 یا بالاتر
- Maven 3.6 یا بالاتر
- PostgreSQL 12 یا بالاتر

## راه‌اندازی دیتابیس

1. PostgreSQL را نصب و راه‌اندازی کنید
2. دیتابیس جدید ایجاد کنید:

```sql
CREATE DATABASE personal_finance;
```

3. فایل `application.properties` را با اطلاعات دیتابیس خود به‌روز کنید:

```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/personal_finance
spring.datasource.username=postgres
spring.datasource.password=your_password
```

## نصب و اجرا

1. پروژه را کلون کنید
2. وارد پوشه پروژه شوید
3. دستور زیر را اجرا کنید:

```bash
mvn clean install
mvn spring-boot:run
```

سرور روی پورت 8080 راه‌اندازی می‌شود: `http://localhost:8080`

## API Endpoints

### Transactions (تراکنش‌ها)

- `GET /api/transactions` - دریافت لیست تمام تراکنش‌ها (مرتب بر اساس تاریخ)
- `GET /api/transactions/{id}` - دریافت یک تراکنش خاص
- `POST /api/transactions` - ایجاد تراکنش جدید
- `PUT /api/transactions/{id}` - ویرایش تراکنش
- `DELETE /api/transactions/{id}` - حذف تراکنش

### Categories (دسته‌ها)

- `GET /api/categories` - دریافت لیست تمام دسته‌ها
- `GET /api/categories/{id}` - دریافت یک دسته خاص
- `POST /api/categories` - ایجاد دسته جدید
- `PUT /api/categories/{id}` - ویرایش دسته
- `DELETE /api/categories/{id}` - حذف دسته (فقط اگر در تراکنش استفاده نشده باشد)

### Summary (خلاصه)

- `GET /api/summary` - دریافت خلاصه مالی (درآمد، هزینه، موجودی)

## نمونه درخواست‌ها

### ایجاد تراکنش جدید

```json
POST /api/transactions
Content-Type: application/json

{
  "type": "EXPENSE",
  "amount": 50000,
  "categoryId": 1,
  "date": "2023-10-27",
  "description": "ناهار در رستوران"
}
```

### پاسخ:

```json
{
  "id": 1,
  "type": "EXPENSE",
  "amount": 50000,
  "category": {
    "id": 1,
    "name": "خوراک",
    "type": "EXPENSE"
  },
  "date": "2023-10-27",
  "description": "ناهار در رستوران"
}
```

### ایجاد دسته جدید

```json
POST /api/categories
Content-Type: application/json

{
  "name": "خوراک",
  "type": "EXPENSE"
}
```

### پاسخ:

```json
{
  "id": 1,
  "name": "خوراک",
  "type": "EXPENSE"
}
```

## ویژگی‌های خاص

1. **حذف دسته**: دسته‌ای که در تراکنش‌ها استفاده شده است نمی‌تواند حذف شود و خطای 400 برمی‌گرداند.
2. **مرتب‌سازی**: تراکنش‌ها به صورت خودکار بر اساس تاریخ مرتب می‌شوند (جدیدترین اول).
3. **اعتبارسنجی**: تمام ورودی‌ها اعتبارسنجی می‌شوند و در صورت نامعتبر بودن، خطای 400 با جزئیات برمی‌گردد.
4. **پاسخ کامل**: در ایجاد تراکنش، فقط categoryId ارسال می‌شود اما در پاسخ، اطلاعات کامل دسته برگردانده می‌شود.

## ساختار پروژه

```
src/main/java/com/finance/
├── entity/              # مدل‌های دیتابیس
├── repository/          # دسترسی به دیتابیس
├── service/             # لایه منطق کسب و کار
├── controller/          # API endpoints
├── dto/                 # Data Transfer Objects
├── exception/           # مدیریت خطاها
└── PersonalFinanceApplication.java
```

## تکنولوژی‌های استفاده شده

- Spring Boot 3.2.0
- Spring Data JPA
- PostgreSQL
- Lombok
- Bean Validation

## توسعه‌دهنده

MiniMax Agent
