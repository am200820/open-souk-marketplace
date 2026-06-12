const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  reviewer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  reviewee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product'
  },
  rating: {
    type: Number,
    required: [true, 'الرجاء إدخال التقييم'],
    min: [1, 'التقييم يجب أن يكون بين 1 و 5'],
    max: [5, 'التقييم يجب أن يكون بين 1 و 5']
  },
  title: {
    type: String,
    required: true,
    minlength: [3, 'عنوان التقييم يجب أن يكون 3 أحرف على الأقل']
  },
  comment: {
    type: String,
    required: true,
    minlength: [10, 'التعليق يجب أن يكون 10 أحرف على الأقل']
  },
  pros: [String],
  cons: [String],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Review', reviewSchema);
