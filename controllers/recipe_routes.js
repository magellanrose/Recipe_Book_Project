const router = require('express').Router();
const Recipe = require('../models/Recipe');
const User = require('../models/User');


// POST route to create a recipe

router.post('/recipes', async (requestObj, responseObj) => {
    try {


        const recipe = await Recipe.create(requestObj.body);

        responseObj.json(recipe);
    } catch (err) {
        console.log(err);

        responseObj.json({
            error: 500,
            message: 'There was an error in storing the recipe'
        });
    }
});


// Get route to get a recipe by id
router.get('/recipe/:id', async (requestObj, responseObj) => {
    const recipe_id = requestObj.params.id;


    const recipe = await Recipe.findByPk(recipe_id);

    if (recipe) {
        return responseObj.json(recipe);
    }

    responseObj.status(404).json({
        message: 'A recipe with that ID could not be found.'
    })
});


// Get route to get all recipes with the attached associated user

router.get('/recipes', async (requestObj, responseObj) => {
    try {
        const recipes = await Recipe.findAll({
            include: {
                model: User,
                attributes: {
                    exclude: ['password', 'createdAt', 'updatedAt']
                }
            }
        });
        responseObj.json(recipes);
    } catch (err) {
        console.log(err);
        responseObj.json({
            error: 500,
            message: 'There was an error in retrieving the recipes',
        });
    }
});


// Delete route to delete a recipe
router.delete('/recipes/:id', async (requestObj, responseObj) => {
    try {
        const recipeId = requestObj.params.id;

        // Delete the recipe by its id
        const deletedRecipeCount = await Recipe.destroy({
            where: {
                id: recipeId
            }
        });

        if (deletedRecipeCount > 0) {
            responseObj.json({ message: 'Recipe deleted successfully' });
        } else {
            responseObj.status(404).json({ error: 'Recipe not found' });
        }
    } catch (err) {
        console.log(err);
        responseObj.status(500).json({ error: 'There was an error in deleting the recipe' });
    }
});


// Get route to get a single recipe by title

router.get('/recipes/search', async (requestObj, responseObj) => {
    try {
        const title = requestObj.query.title;

        // Find the recipe by its title
        const recipe = await Recipe.findOne({
            where: {
                title: title
            },
            include: {
                model: User,
                attributes: {
                    exclude: ['password', 'createdAt', 'updatedAt']
                }
            }
        });

        if (!recipes.length) {
            return responseObj.json({
                error: 404,
                message: 'No recipe by that title.'
            })
        }

        if (recipe) {
            responseObj.json(recipe);
        } else {
            responseObj.status(404).json({ error: 'Recipe not found' });
        }
    } catch (err) {
        console.log(err);
        responseObj.status(500).json({ error: 'There was an error in retrieving the recipe' });
    }
});

module.exports = router;