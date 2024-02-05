const router = require('express').Router();
const User = require('../models/User');
const Recipe = require('../models/Recipe');

const formController = require('../controllers/form_controller')

// POST - CREATE A USER ROUTE
router.post('/register', formController.createUser);

router.post('/login', formController.loginUser);
// POST - CREATE A RECIPE ROUTE
router.post('/create/recipe', formController.createRecipe);




module.exports = router;