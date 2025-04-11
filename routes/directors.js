const express = require('express');
const router = express.Router();

const directorsController = require('../controllers/directors');
const validation = require('../middleware/validate');
//const { isAuthenticated } = require("../middleware/authenticate");

router.get('/', directorsController.getAll);

router.get('/:id', directorsController.getSingle);

router.post('/', validation.saveDirector, directorsController.createDirector);

router.put('/:id', validation.saveDirector, directorsController.updateDirector);

router.delete('/:id', directorsController.deleteDirector);

module.exports = router;