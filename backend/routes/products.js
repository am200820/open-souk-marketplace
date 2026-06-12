const express = require('express');
const Product = require('../models/Product');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const { page = 1, limit = 12, category, minPrice, maxPrice, search, sortBy = '-createdAt' } = req.query;

    let filter = { status: 'available' };

    if (category) filter.category = category;
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = minPrice;
      if (maxPrice) filter.price.$lte = maxPrice;
    }

    if (search) {
      filter.$text = { $search: search };
    }

    const skip = (page - 1) * limit;
    const products = await Product.find(filter)
      .populate('seller', 'name profileImage rating')
      .sort(sortBy)
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Product.countDocuments(filter);

    res.json({
      success: true,
      data: products,
      pagination: {
        total,
        pages: Math.ceil(total / limit),
        currentPage: page
      }
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
    const { title, description, category, price, images, condition, location } = req.body;

    if (!title || !description || !category || !price || !images || !condition) {
      return res.status(400).json({
        success: false,
        message: 'الرجاء ملء جميع الحقول المطلوبة'
      });
    }

    const product = new Product({
      title,
      description,
      category,
      price,
      images,
      thumbnail: images[0],
      seller: req.user._id,
      condition,
      location
    });

    await product.save();

    res.status(201).json({
      success: true,
      message: 'تم إنشاء المنتج بنجاح',
      data: product
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

module.exports = router;
