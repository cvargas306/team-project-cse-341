const express = require('express');
const router = express.Router();

const usersController = require('../controllers/users');
const validation = require('../middleware/validate');
const { isAuthenticated } = require("../middleware/authenticate");

router.get('/', usersController.getAllUsers);

router.get('/:id', usersController.getSingleUser);

router.post('/', isAuthenticated, validation.saveUser, usersController.createUser);

router.put('/:id', isAuthenticated, validation.saveUser, usersController.updateUser);

router.delete('/:id', isAuthenticated, usersController.deleteUser);

router.post('/login', usersController.loginUser);


module.exports = router;
