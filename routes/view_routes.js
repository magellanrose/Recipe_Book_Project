const router = require('express').Router();
// const path = require('path');
const { fn, col } = require('sequelize');

const User = require('../models/User');
const Recipe = require('../models/Recipe');
const viewController = require('../controllers/view_controller')



function protect(req, res, next) {
    if(!req.session.user_id) {
        return res.redirect('/login')
    }
    next()
}

async function attachUser(req, res, next) {
    const user = await User.findByPk(req.session.user_id)
    req.user = user && user.get({
        plain: true
    })
    next()
}

// Show the homepage
router.get('/', attachUser, viewController.showHomePage);


router.get('/create/recipe', protect, attachUser, viewController.showRecipeForm);

router.get('/register', viewController.showRegisterPage);

router.get('/login', viewController.showLoginPage);

router.get('/logout', viewController.logoutUser);

// SHOW THE DATA PAGE
router.get('/data', viewController.showDataPage);


module.exports = router;