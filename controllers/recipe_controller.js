module.exports = {

    async createRecipe(req, res){
    try {


        const recipe = await Recipe.create(requestObj.body);

        res.json(recipe);
    } catch (err) {
        console.log(err);

        res.json({
            error: 500,
            message: 'There was an error in storing the recipe'
        });
    }

    },

    async getRecipeById(req, res){
        const recipe_id = requestObj.params.id;


    const recipe = await Recipe.findByPk(recipe_id);

    if (recipe) {
        return res.json(recipe);
    }

    res.status(404).json({
        message: 'A recipe with that ID could not be found.'
    })
    },

async getAllRecipes(req, res){
    try {
        const recipes = await Recipe.findAll({
            include: {
                model: User,
                attributes: {
                    exclude: ['password', 'createdAt', 'updatedAt']
                }
            }
        });
        res.json(recipes);
    } catch (err) {
        console.log(err);
        res.json({
            error: 500,
            message: 'There was an error in retrieving the recipes',
        });
    }
},

async deleteRecipe(req, res){
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
},

async searchRecipes(req, res){
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
}

}