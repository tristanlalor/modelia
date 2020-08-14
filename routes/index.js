const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../config/auth')

//Welcome page
router.get('/', (req, res) => {
    if (req.user) {
        // res.locals.user = req.user;
        // res.locals.loggedIn = true;
        // window.user = req.user;
        // window.loggedIn = true;
        // res.redirect('/dashboard');
        res.render('welcome', {
            user: req.user,
            loggedIn: true
        });
    } else {
        // window.loggedIn = false;
        // res.locals.loggedIn = false;
        res.render('welcome', { loggedIn: false });
    }
});
//Dashboard
router.get('/dashboard', ensureAuthenticated, (req, res) => res.render('dashboard', {
    user: req.user
}));

module.exports = router;
