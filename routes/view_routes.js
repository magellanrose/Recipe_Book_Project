const router = require('express').Router();
// const path = require('path');
const { fn, col } = require('sequelize');

const User = require('../models/User');
const Recipe = require('../models/Recipe');
const viewController = require('../controllers/view_controller')

// Show the homepage
router.get('/', viewController.showHomePage);


router.get('/create/recipe', viewController.showRecipeForm);

router.get('/register', viewController.showRegisterPage);

router.get('/login', viewController.showLoginPage);

// SHOW THE DATA PAGE
router.get('/data', viewController.showDataPage);


module.exports = router;