const express = require('express');
const router = express.Router();

const usersController = require('../controllers/users');
const validation = require('../middleware/validate');
//const { isAuthenticated } = require("../middleware/authenticate");
const authenticateJWT = require('../middleware/authenticateJWT');

router.get('/', usersController.getAllUsers);

router.get('/:id', usersController.getSingleUser);

// router.post('/', isAuthenticated, validation.saveUser, usersController.createUser);

// router.put('/:id', isAuthenticated, validation.saveUser, usersController.updateUser);

// router.delete('/:id', isAuthenticated, usersController.deleteUser);

router.post('/', authenticateJWT, validation.saveUser, usersController.createUser);

router.put('/:id', authenticateJWT, validation.saveUser, usersController.updateUser);

router.delete('/:id', authenticateJWT, usersController.deleteUser);

router.post('/login', usersController.loginUser);


module.exports = router;
