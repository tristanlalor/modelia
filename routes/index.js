const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../config/auth')

//Welcome page
router.get('/', (req, res) => {
    if (req.user) {
        res.redirect('/dashboard');
    } else res.render('Welcome');
});
//Dashboard
router.get('/dashboard', ensureAuthenticated, (req, res) => res.render('dashboard', {
    user: req.user
}));

module.exports = router;
