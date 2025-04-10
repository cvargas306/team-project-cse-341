const router = require('express').Router();

router.use('/', require('./swagger'));

router.get('/', (req, res) => {
    //#swagger.tags=['Hello, World!']
    res.send('Hello, Team project!');
});

router.use('/directors', require('./directors'));
router.use('/movies', require('./movies'));

module.exports = router;