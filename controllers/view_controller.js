const User = require('../models/User');
const Recipe = require('../models/Recipe');
const { fn, col } = require('sequelize');

module.exports = {


  async showHomePage(req, res) {

    res.render('home', {
      title: 'User App API Documentation',
      user: req.user
    });
  },

  async showLoginPage(req, res) {
    res.render('form/login_form', {
      title: 'User Form',
      login: true
    });
  },

  async showRecipeForm(req, res) {
    res.render('form/recipe_form', {
      title: 'Recipe Form',
      recipe: true,
      user: req.user
    });
  },

  async showRegisterPage(req, res) {
    res.render('form/register_form', {
      register: true
    });
  },

  async showDataPage(req, res) {
    const users = await User.findAll()

    if (!users.length) {
      return res.redirect('/login')
    }

    const recipes = await Recipe.findAll({
      include: User,
      attributes: [
        'id',
        'title',
        'recipe',
        'ingredients'
        // [fn('date_format', col('createdAt'), '%m/%d/%Y'), 'formatted_date']
      ]
    });
    console.log(recipes)
    res.render('data', {
      user: req.user,
      recipes: recipes.map(recipeObj => recipeObj.get({ plain: true }))
    });
  },

  async logoutUser(req, res) {
    req.session.destroy()
    res.redirect('/')
  },
}