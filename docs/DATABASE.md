# 📊 Database Schema

## Collections

### Users
- name: String
- email: String (unique)
- password: String (hashed)
- phone: String
- role: String (buyer/seller/admin)
- rating: Number
- followers: [ObjectId]
- following: [ObjectId]
- createdAt: Date

### Products
- title: String
- description: String
- category: String
- price: Number
- images: [String]
- seller: ObjectId (ref: User)
- status: String (available/sold/pending)
- condition: String
- location: Object
- views: Number
- likes: [ObjectId]
- createdAt: Date

### Messages
- sender: ObjectId (ref: User)
- receiver: ObjectId (ref: User)
- content: String
- isRead: Boolean
- createdAt: Date

### Reviews
- reviewer: ObjectId (ref: User)
- reviewee: ObjectId (ref: User)
- rating: Number (1-5)
- title: String
- comment: String
- createdAt: Date
