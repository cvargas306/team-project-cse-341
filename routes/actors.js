const express = require('express');
const router = express.Router();

const actorsController = require('../controllers/actors');
const validation = require('../middleware/validate');

router.get('/', actorsController.getAllActors);

router.get('/:id', actorsController.getSingleActor);

router.post('/', validation.saveActor, actorsController.createActor);

router.put('/:id', validation.saveActor, actorsController.updateActor);

router.delete('/:id', actorsController.deleteActor);

module.exports = router;
