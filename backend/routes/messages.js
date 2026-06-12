const express = require('express');
const Message = require('../models/Message');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.get('/', protect, async (req, res) => {
  try {
    const messages = await Message.find({
      $or: [{ sender: req.user._id }, { receiver: req.user._id }]
    })
      .populate('sender', 'name profileImage')
      .populate('receiver', 'name profileImage')
      .sort('-createdAt');

    res.json({
      success: true,
      data: messages
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
    const { receiver, content, product } = req.body;

    if (!receiver || !content) {
      return res.status(400).json({
        success: false,
        message: 'الرجاء ملء جميع الحقول المطلوبة'
      });
    }

    const message = new Message({
      sender: req.user._id,
      receiver,
      content,
      product
    });

    await message.save();
    await message.populate('sender', 'name profileImage');
    await message.populate('receiver', 'name profileImage');

    res.status(201).json({
      success: true,
      message: 'تم إرسال الرسالة بنجاح',
      data: message
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

module.exports = router;
