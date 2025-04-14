const express = require('express');
const router = express.Router();

const actorsController = require('../controllers/actors');
const validation = require('../middleware/validate');
const { isAuthenticated } = require("../middleware/authenticate");

router.get('/', actorsController.getAllActors);

router.get('/:id', actorsController.getSingleActor);

router.post('/', isAuthenticated, validation.saveActor, actorsController.createActor);

router.put('/:id', isAuthenticated, validation.saveActor, actorsController.updateActor);

router.delete('/:id', isAuthenticated, actorsController.deleteActor);

module.exports = router;
