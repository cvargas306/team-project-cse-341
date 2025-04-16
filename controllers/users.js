const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const getAllUsers = async (req, res) => {
    //#swagger.tags=['users']
    try {
        const result = await mongodb.getDatabase().db().collection('users').find();
        const users = await result.toArray();
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getSingleUser = async (req, res) => {
    //#swagger.tags=['users']
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).json({ error: 'Invalid user ID' });
    }
    try {
        const userId = new ObjectId(req.params.id);
        const user = await mongodb.getDatabase().db().collection('users').findOne({ _id: userId });
        if (!user) return res.status(404).json({ error: 'User not found' });
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const createUser = async (req, res) => {
    //#swagger.tags=['users']
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10); // 10 = salt rounds

        const user = {
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword, // Save the hashed password
            role: req.body.role
        };

        const response = await mongodb.getDatabase().db().collection('users').insertOne(user);
        if (response.acknowledged) {
            res.status(201).json({ message: 'User created successfully', userId: response.insertedId });
        } else {
            res.status(500).json({ error: 'Failed to create user' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message || 'Error creating user' });
    }
};

const updateUser = async (req, res) => {
    //#swagger.tags=['users']
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).json({ error: 'Invalid user ID' });
    }
    const userId = new ObjectId(req.params.id);
    const user = {
        username: req.body.username,
        email: req.body.email,
        role: req.body.role
    };
    try {
        const result = await mongodb.getDatabase().db().collection('users').replaceOne({ _id: userId }, user);
        if (result.modifiedCount > 0) {
            res.status(200).json({ message: 'User updated successfully' });
        } else {
            res.status(404).json({ error: 'User not found or unchanged' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteUser = async (req, res) => {
    //#swagger.tags=['users']
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).json({ error: 'Invalid user ID' });
    }
    try {
        const userId = new ObjectId(req.params.id);
        const result = await mongodb.getDatabase().db().collection('users').deleteOne({ _id: userId });
        if (result.deletedCount > 0) {
            res.status(200).json({ message: 'User deleted' });
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const loginUser = async (req, res) => {
    //#swagger.tags=['users']
    try {
        const user = await mongodb.getDatabase().db().collection('users').findOne({ email: req.body.email });

        if (!user) {
            return res.status(401).json({ error: 'User not found' });
        }

        const match = await bcrypt.compare(req.body.password, user.password);
        if (!match) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const token = jwt.sign(
            { userId: user._id, email: user.email, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
          );
        
        res.status(200).json({ message: 'Login successful', token, userId: user._id });
    } catch (error) {
        res.status(500).json({ error: error.message || 'Login error' });
    }
};


module.exports = {
    getAllUsers,
    getSingleUser,
    createUser,
    updateUser,
    deleteUser,
    loginUser
};
