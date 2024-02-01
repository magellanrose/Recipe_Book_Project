const router = require('express').Router();
const User = require('../models/User');
const Recipe = require('../models/Recipe');

// POST - CREATE A USER ROUTE
router.post('/create/user', async (req, res) => {
    try {
        await User.create(request.body);


    } catch (err) {
        console.log(err)
        res.redirect('/create/user');
    }

});

// POST - CREATE A RECIPE ROUTE
router.post('/create/recipe', async (req, res) => {
    try {

    } catch (error) {

    }
})


module.exports = router;