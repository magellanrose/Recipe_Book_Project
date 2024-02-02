const router = require('express').Router();
const User = require('../models/User');
const Recipe = require('../models/Recipe');

const formController = require('../controllers/form_controller')

// POST - CREATE A USER ROUTE
router.post('/create/user', formController.createUser);

// POST - CREATE A RECIPE ROUTE
router.post('/create/recipe', formController.createRecipe);


module.exports = router;