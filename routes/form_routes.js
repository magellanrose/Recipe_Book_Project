const router = require('express').Router();
const User = require('../models/User');
const Recipe = require('../models/Recipe');

const formController = require('../controllers/form_controller')


function protect(req, res, next) {
    if (!req.session.user_id) {
        return res.redirect('/login')
    }
    next()
}
async function attachUser(req, res, next) {
    const user = await User.findByPk(req.session.user_id);

    req.user = user && user.get({
        plain: true
    })
    next();

}
// POST - CREATE A USER ROUTE
router.post('/register', formController.createUser);

router.post('/login', formController.loginUser);
// POST - CREATE A RECIPE ROUTE
router.post('/create/recipe', protect, attachUser, formController.createRecipe);




module.exports = router;