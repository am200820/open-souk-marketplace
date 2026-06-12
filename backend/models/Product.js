const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'الرجاء إدخال عنوان المنتج'],
    trim: true,
    minlength: [5, 'العنوان يجب أن يكون 5 أحرف على الأقل']
  },
  description: {
    type: String,
    required: [true, 'الرجاء إدخال وصف المنتج'],
    minlength: [20, 'الوصف يجب أن يكون 20 حرف على الأقل']
  },
  category: {
    type: String,
    required: true,
    enum: ['سيارات', 'عقارات', 'إلكترونيات', 'ملابس', 'أثاث', 'كتب', 'ألعاب', 'أخرى']
  },
  price: {
    type: Number,
    required: [true, 'الرجاء إدخال السعر'],
    min: [0, 'السعر يجب أن يكون أكبر من 0']
  },
  images: [{
    type: String,
    required: true
  }],
  thumbnail: {
    type: String,
    required: true
  },
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  status: {
    type: String,
    enum: ['available', 'sold', 'pending'],
    default: 'available'
  },
  condition: {
    type: String,
    enum: ['جديد', 'مستخدم قليل', 'مستخدم'],
    required: true
  },
  location: {
    city: String,
    region: String
  },
  views: {
    type: Number,
    default: 0
  },
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  tags: [String],
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

productSchema.index({ title: 'text', description: 'text', tags: 'text' });

module.exports = mongoose.model('Product', productSchema);
