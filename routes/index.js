const router = require('express').Router();

router.get('/', (req, res) => { res.send('Hello, Team Project!'); });

router.use('/directors', require('./directors'));
router.use('/movies', require('./movies'));

module.exports = router;