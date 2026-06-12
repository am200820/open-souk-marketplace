# 🚀 دليل التثبيت والإعداد

## المتطلبات الأساسية

- Node.js 18+ 
- MongoDB
- Git
- npm أو yarn

## الطريقة 1: التثبيت المحلي

### 1. استنساخ المشروع
```bash
git clone https://github.com/am200820/open-souk-marketplace.git
cd open-souk-marketplace
```

### 2. إعداد Backend

```bash
cd backend
npm install
cp .env.example .env
npm run dev
```

### 3. إعداد Frontend

```bash
cd frontend
npm install
npm run dev
```

### 4. الوصول للتطبيق
- Frontend: http://localhost:3000
- Backend: http://localhost:5000

## الطريقة 2: Docker

```bash
git clone https://github.com/am200820/open-souk-marketplace.git
cd open-souk-marketplace
docker-compose up --build
```

## متغيرات البيئة

### Backend (.env)
```
MONGODB_URI=mongodb://localhost:27017/open-souk
PORT=5000
NODE_ENV=development
JWT_SECRET=your_super_secret_key_here
FRONTEND_URL=http://localhost:3000
```

## استكشاف الأخطاء

### المشكلة: لا يمكن الاتصال بـ MongoDB

```bash
# تأكد من تشغيل MongoDB
mongod
```

### المشكلة: الحنفة 5000 قيد الاستخدام

```bash
# غير الحنفة في .env
PORT=5001
```
