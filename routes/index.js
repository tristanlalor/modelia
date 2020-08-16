const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../config/auth')

//Welcome page
router.get('/', (req, res) => {
    if (req.user) {
        res.render('welcome', {
            user: req.user,
            loggedIn: true,
            path: req.path
        });
    } else {
        res.render('welcome', { loggedIn: false, path: req.path });
    }
});
//Dashboard
router.get('/dashboard', ensureAuthenticated, (req, res) => res.render('dashboard', {
    user: req.user
}));

module.exports = router;
