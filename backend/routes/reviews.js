const express = require('express');
const Review = require('../models/Review');
const User = require('../models/User');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.get('/user/:userId', async (req, res) => {
  try {
    const reviews = await Review.find({ reviewee: req.params.userId })
      .populate('reviewer', 'name profileImage rating')
      .sort('-createdAt');

    res.json({
      success: true,
      data: reviews
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

router.post('/', protect, async (req, res) => {
  try {
    const { reviewee, product, rating, title, comment, pros, cons } = req.body;

    if (!reviewee || !rating || !title || !comment) {
      return res.status(400).json({
        success: false,
        message: 'الرجاء ملء جميع الحقول المطلوبة'
      });
    }

    const review = new Review({
      reviewer: req.user._id,
      reviewee,
      product,
      rating,
      title,
      comment,
      pros,
      cons
    });

    await review.save();
    await review.populate('reviewer', 'name profileImage rating');

    res.status(201).json({
      success: true,
      message: 'تم إضافة التقييم بنجاح',
      data: review
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

module.exports = router;
