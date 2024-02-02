module.exports = {

  async showHomePage(req, res) {

    res.render('home', {
      title: 'User App API Documentation'
    });
  },

  async showUserForm(req, res) {
    res.render('user_form', {
      title: 'User Form'
    });
  },

  async showRecipeForm(req, res){
    res.render('recipe_form', {
      title: 'Recipe Form'
    });
  },

  async showDataPage(req, res) {
    const users = await User.findAll();
  const recipes = await Recipe.findAll({
    include: User,
    attributes: [
      'id',
      'title',
      'author',
      [fn('date_format', col('release_date'), '%m/%d/%Y'), 'formatted_date']
    ]
  });

  responseObj.render('data', {
    users: users.map(usrObj => usrObj.get({ plain: true })),
    recipes: recipes.map(recipeObj => recipeObj.get({ plain: true }))
  });
  }
}