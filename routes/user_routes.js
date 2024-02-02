const router = require('express').Router();
const User = require('../models/User')
const Recipe = require('../models/Recipe')

const db = require('../db/connection');
const userController = require('../controllers/user_controller')

//Route to retreive/GET all users from the database
router.get('/register', userController.getAllUsers);
//Route to add a user to json database
router.post('/register', userController.addUser);

//GET Route to return a user by ID
router.get('/user', userController.getUserById);

//GET Route to get the users and their associated recipes
router.get('/users/recipes', userController.getRecipe);

//GET route to get a single user's recipes
router.get('/user/recipe/:user_id', userController.singleUserRecipe);

//DELETE route to remove a user from database (HW 11!)
router.delete('/user/:id', userController.deleteUser);




// // Route to retrieve/GET all users from the json database
// router.get('/users', userController.getAllUsers);

// // Route to create a new user
// router.post('/users', userController.createUser);

// // Route to get a single user by ID
// router.get('/users/:id', userController.getUserById);

// // Route to delete a user by ID
// router.delete('/users/:id', userController.deleteUserById);

// // Route to retrieve/GET all users with recipes
// router.get('/users/recipes', userController.getAllUsersWithRecipes);

// // Route to retrieve/GET a user with recipes by ID
// router.get('/users/:id/recipes', userController.getUserWithRecipesById);




module.exports = router;