const router = require('express').Router();
const Recipe = require('../models/Recipe');
const User = require('../models/User');
const recipeController = require('../controllers/recipe_controller');

// POST route to create a recipe

router.post('/recipes', recipeController.createRecipe);

// Get route to get a recipe by id
router.get('/recipe/:id', recipeController.getRecipeById);


// Get route to get all recipes with the attached associated user

router.get('/recipes', recipeController.getAllRecipes);


// Delete route to delete a recipe
router.delete('/recipes/:id', recipeController.deleteRecipe);

// Get route to get a single recipe by title

router.get('/recipes/search', recipeController.searchRecipes);

module.exports = router;