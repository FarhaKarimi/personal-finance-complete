-- ایجاد دیتابیس
CREATE DATABASE personal_finance;

-- اتصال به دیتابیس
\c personal_finance;

-- دیتابیس به صورت خودکار توسط Hibernate ایجاد می‌شود
-- اما می‌توانید دسته‌های اولیه را اینجا اضافه کنید

-- دسته‌های هزینه اولیه
INSERT INTO categories (name, type) VALUES ('خوراک', 'EXPENSE');
INSERT INTO categories (name, type) VALUES ('حمل و نقل', 'EXPENSE');
INSERT INTO categories (name, type) VALUES ('سرگرمی', 'EXPENSE');
INSERT INTO categories (name, type) VALUES ('مسکن', 'EXPENSE');
INSERT INTO categories (name, type) VALUES ('بهداشت', 'EXPENSE');
INSERT INTO categories (name, type) VALUES ('خرید', 'EXPENSE');
INSERT INTO categories (name, type) VALUES ('سایر', 'EXPENSE');

-- دسته‌های درآمد اولیه
INSERT INTO categories (name, type) VALUES ('حقوق', 'INCOME');
INSERT INTO categories (name, type) VALUES ('فریلنس', 'INCOME');
INSERT INTO categories (name, type) VALUES ('سرمایه‌گذاری', 'INCOME');
INSERT INTO categories (name, type) VALUES ('هدیه', 'INCOME');
INSERT INTO categories (name, type) VALUES ('سایر', 'INCOME');
