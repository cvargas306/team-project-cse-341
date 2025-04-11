const router = require('express').Router();
//const passport = require('passport');

router.use('/', require('./swagger'));

router.get('/', (req, res) => {
    //#swagger.tags=['Hello, World!']
    res.send('Hello, Team project!');
});

// router.get('/login', passport.authenticate('github'), (req, res) => { });

// router.get('/logout', function (req, res, next) {
//     req.logout(function (err) {
//         if (err) { return next(err); }
//         res.redirect('/');
//     });
// });

router.use('/directors', require('./directors'));
router.use('/movies', require('./movies'));

module.exports = router;