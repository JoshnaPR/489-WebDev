// This is where the actual logic lies for Users
const bcrypt = require('bcryptjs');
const User = require('../models/User');
require('dotenv').config();
const jwt=require('jsonwebtoken');

const createUser = async (req, res) => {
    try {
        const { FirstName, LastName, CountryCode, PhoneNumber, Password } = req.body;
        const hashedPassword = await bcrypt.hash(Password, 10);
        const user = await User.create({
            FirstName,
            LastName,
            CountryCode,
            PhoneNumber,
            Password: hashedPassword
        });
        res.status(201).json({ message: 'User created successfully!', user });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { FirstName, LastName, CountryCode, PhoneNumber } = req.body;

        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        await user.update({ FirstName, LastName, CountryCode, PhoneNumber });
        res.json({ message: 'User updated successfully', user });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;

        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        await user.destroy();
        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const registerUser = async (req, res) => {
    try {
        const { FirstName, LastName, CountryCode, PhoneNumber, Password } = req.body;
        // Check if the phone number already exists
        const existingUser = await User.findOne({ where: { PhoneNumber } });
        if (existingUser) {
            return res.status(400).json({ message: 'Phone number already in use' });
        }
        // Hash password
        const hashedPassword = await bcrypt.hash(Password, 10);
        const user = await User.create({
            FirstName,
            LastName,
            CountryCode,
            PhoneNumber,
            Password: hashedPassword
        });
        res.status(201).json({ message: 'User registered successfully!', user });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Login User
const loginUser = async (req, res) => {
    try {
        const { PhoneNumber, Password } = req.body;
        // Check if user exists
        const user = await User.findOne({ where: { PhoneNumber } });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        // Check password
        const isMatch = await bcrypt.compare(Password, user.Password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        // Generate JWT token
        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ message: 'Login successful', token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { createUser, getUsers, updateUser, deleteUser, registerUser, loginUser };
