# 📡 API Documentation

## Base URL
```
http://localhost:5000/api
```

## Authentication
```
Authorization: Bearer <token>
```

## 🔐 Auth Endpoints

### Register
```
POST /auth/register
{
  "name": "محمد",
  "email": "user@example.com",
  "password": "password123",
  "phone": "0501234567",
  "role": "buyer"
}
```

### Login
```
POST /auth/login
{
  "email": "user@example.com",
  "password": "password123"
}
```

## 📦 Products

### Get Products
```
GET /products?page=1&limit=12&category=electronics
```

### Create Product
```
POST /products
Authorization: Bearer <token>
{
  "title": "iPhone 14",
  "description": "هاتف ذكي",
  "category": "إلكترونيات",
  "price": 2500,
  "images": ["url1", "url2"],
  "condition": "جديد"
}
```

## 💬 Messages

### Send Message
```
POST /messages
Authorization: Bearer <token>
{
  "receiver": "userId",
  "content": "مرحبا",
  "product": "productId"
}
```

## ⭐ Reviews

### Add Review
```
POST /reviews
Authorization: Bearer <token>
{
  "reviewee": "userId",
  "rating": 5,
  "title": "ممتاز",
  "comment": "تعامل رائع"
}
```
