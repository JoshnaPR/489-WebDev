// routes/UserRoutes.js
const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');
const authenticate = require('../middlewares/authMiddleware');

// Routes for users
router.post('/', UserController.createUser);
router.get('/', UserController.getUsers);
router.put('/:id', UserController.updateUser);
router.delete('/:id', UserController.deleteUser);
router.post('/register', UserController.registerUser);
router.post('/login', UserController.loginUser);

// router.get('/protected', authenticate, (req, res) => {
//     res.json({ message: 'You are authorized!', user: req.user });
// });


module.exports = router;
