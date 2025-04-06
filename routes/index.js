const router = require('express').Router();


router.get('/', (req, res) => {

    res.send('Hello, Team Project!');
});

module.exports = router;