# 🏪 Open Souk Marketplace
منصة سوق إلكترونية مفتوحة للبيع والشراء

## 📋 نظرة عامة
موقع متكامل يجمع البائعين والمشترين مع واجهة سهلة الاستخدام وميزات متقدمة.

## ✨ الميزات الرئيسية
- ✅ تسجيل المستخدمين والمصادقة
- ✅ إضافة وإدارة الإعلانات
- ✅ نظام البحث والتصفية المتقدم
- ✅ نظام الرسائل بين المستخدمين
- ✅ تقييمات ومراجعات
- ✅ لوحة التحكم الشخصية
- ✅ نظام الدفع المتكامل
- ✅ لوحة إدارة (Admin Panel)

## 🛠️ التقنيات المستخدمة

### Frontend
- **React 18** - مكتبة الواجهات
- **Next.js 14** - إطار العمل
- **TypeScript** - لغة البرمجة
- **Tailwind CSS** - التنسيقات
- **Socket.io** - التواصل الفوري

### Backend
- **Node.js** - بيئة التشغيل
- **Express.js** - إطار العمل
- **MongoDB** - قاعدة البيانات
- **Mongoose** - مكتبة النمذجة
- **JWT** - المصادقة
- **Socket.io** - الرسائل الفورية

## 📁 هيكل المشروع
```
open-souk-marketplace/
├── frontend/                 # تطبيق React
├── backend/                  # خادم Express
├── docs/                     # التوثيق
└── docker-compose.yml        # Docker setup
```

## 🚀 البدء السريع

### التثبيت المحلي
```bash
# استنساخ المشروع
git clone https://github.com/am200820/open-souk-marketplace.git
cd open-souk-marketplace

# تثبيت Frontend
cd frontend
npm install
npm run dev

# تثبيت Backend (في terminal منفصل)
cd backend
npm install
npm run dev
```

### استخدام Docker
```bash
docker-compose up --build
```

## 📖 التوثيق
- [دليل التثبيت](./docs/INSTALLATION.md)
- [API Documentation](./docs/API.md)
- [Database Schema](./docs/DATABASE.md)
- [Contributing Guide](./CONTRIBUTING.md)

## 👥 الفريق
- المطور: am200820

## 📄 الترخيص
MIT License
