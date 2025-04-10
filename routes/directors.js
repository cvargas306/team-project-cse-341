const express = require('express');
const router = express.Router();

const directorsController = require('../controllers/directors');

router.get('/', directorsController.getAll);

router.get('/:id', directorsController.getSingle);

router.post('/', directorsController.createDirector);

router.put('/:id', directorsController.updateDirector);

router.delete('/:id', directorsController.deleteDirector);

module.exports = router;