const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chatController');
const adminController = require('../controllers/adminController');
const User = require('../models/User');

// Guest & Auth Endpoints connected directly to MongoDB
router.post('/auth/guest', (req, res) => {
  res.json({
    success: true,
    token: `guest-token-${Date.now()}`,
    user: { name: 'Guest Student', email: '', role: 'guest' }
  });
});

router.post('/auth/signup', async (req, res) => {
  const { name, email, password, regNo } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ success: false, error: 'Name, email, and password are required.' });
  }

  try {
    const cleanEmail = email.toLowerCase().trim();
    const existing = await User.findOne({ email: cleanEmail });
    if (existing) {
      return res.status(400).json({ success: false, error: 'An account with this email already exists.' });
    }

    const newUser = await User.create({
      name: name.trim(),
      email: cleanEmail,
      password,
      regNo: regNo ? regNo.trim() : '',
      role: 'student'
    });

    res.json({
      success: true,
      token: `token-${newUser._id}-${Date.now()}`,
      user: { name: newUser.name, email: newUser.email, role: 'student', regNo: newUser.regNo }
    });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Failed to create user in MongoDB: ' + err.message });
  }
});

router.post('/auth/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ success: false, error: 'Email and password required' });
  }

  const cleanEmail = email.toLowerCase().trim();

  // Demo student fallback login
  if (cleanEmail === 'student@aditya.edu' && (password === '123456' || password === 'student123')) {
    return res.json({
      success: true,
      token: `demo-student-token-${Date.now()}`,
      user: { name: 'Aditya Student', email: 'student@aditya.edu', role: 'student', regNo: '21A91A0501' }
    });
  }

  try {
    const user = await User.findOne({ email: cleanEmail });
    if (!user || user.password !== password) {
      return res.status(401).json({ success: false, error: 'Invalid email or password' });
    }

    res.json({
      success: true,
      token: `user-token-${user._id}-${Date.now()}`,
      user: { name: user.name, email: user.email, role: user.role, regNo: user.regNo }
    });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Login failed: ' + err.message });
  }
});

router.post('/admin/login', (req, res) => {
  const { email, password } = req.body;
  if (email === 'admin@aditya.edu' && password === 'admin123') {
    return res.json({
      success: true,
      token: `admin-token-${Date.now()}`,
      user: { name: 'Aditya Admin', email, role: 'admin' }
    });
  }
  res.status(401).json({ success: false, error: 'Invalid admin credentials' });
});

// Student Chat & Notifications Routes
router.post('/chat', chatController.handleChat);
router.get('/notifications/:email', chatController.getStudentNotifications);

// Admin Dashboard Routes
router.get('/admin/tickets', adminController.getTickets);
router.post('/admin/tickets/:id/reply', adminController.replyTicket);
router.get('/admin/metrics', adminController.getMetrics);

// Supported languages
router.get('/languages', (req, res) => {
  res.json({
    languages: [
      { code: 'en', name: 'English' },
      { code: 'te', name: 'Telugu' },
      { code: 'hi', name: 'Hindi' },
      { code: 'ta', name: 'Tamil' },
      { code: 'kn', name: 'Kannada' },
      { code: 'ml', name: 'Malayalam' },
      { code: 'fr', name: 'French' },
      { code: 'de', name: 'German' },
      { code: 'es', name: 'Spanish' }
    ]
  });
});

module.exports = router;
