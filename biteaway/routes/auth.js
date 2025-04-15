const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const User = require('../models/User');

// Login page
router.get('/login', (req, res) => {
  res.render('login');
});

// Register page
router.get('/register', (req, res) => {
  res.render('register');
});

// Register handler
router.post('/register', async (req, res) => {
  const { firstName, lastName, email, password, countryCode, phoneNumber, userAddress } = req.body;
  try {
    console.log("INSIDE REGISTER POST")
    
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      userID: Date.now(), // Quick unique ID
      firstName,
      lastName,
      countryCode,
      phoneNumber,
      userAddress,
      email,
      password: hashedPassword,
      isAdmin: false,
      isStarUser: false,
    });
    req.session.userId = user.userID;
    req.session.isAdmin = user.isAdmin;
    console.log("USER ID: ", user.userID)
    res.redirect('/');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error creating user');
  }
});

// Login handler
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ where: { email } });
  if (user && await bcrypt.compare(password, user.password)) {
    req.session.userId = user.userID;
    req.session.isAdmin = user.isAdmin;
    res.redirect(user.isAdmin ? '/admin/dashboard' : '/user/home');
  } else {
    res.send('Invalid email or password');
  }
});

// Logout
router.get('/logout', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/login');
  });
});

module.exports = router;
