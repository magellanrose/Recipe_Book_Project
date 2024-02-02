module.exports = {

  async showHomePage(req, res) {

    res.render('home', {
      title: 'User App API Documentation'
    });
  },

  async showUserForm(req, res) {
    res.render('form/login_form', {
      title: 'User Form'
    });
  },

  async showRecipeForm(req, res){
    res.render('form/recipe_form', {
      title: 'Recipe Form'
    });
  },

  async showRegisterPage(req, res) {
    res.render('form/register_form');
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