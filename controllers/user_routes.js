const router = require('express').Router();
const User = require('../models/User')
const Recipe = require('../models/Recipe')

const db = require('../db/connection');

//Route to retreive/GET all users from the database
router.get('/register', async (req, res) => {
    try {
        const users = User.findAll();

        res.json(users);
    } catch (err) {
        console.log(err);
    }
});

//Route to add a user to json database
router.post('/register', async (req, res) => {
    const userData = req.body;

    try {
        const user = await User.create(userData);

        res.json({
            message: 'User successfully added',
            user: user
        });
    } catch (err) {
        const errorMessage = err.errors.map(eObj => eObj.message);

        resObj / json({
            error: 402,
            message: messages
        });
    }
});

//GET Route to return a user by ID
router.get('/user', async (requestObj, responseObj) => {
    const user_id = requestObj.query.user_id;

    try {
        const user = await User.findOne({
            where: {
                id: user_id
            }
        });

        if (user) {
            return responseObj.json(user);
        }

        responseObj.json({
            error: 404,
            message: 'User not found with that id'
        });
    } catch {
        console.log(err);
    }

});

//GET Route to get the users and their associated recipes
router.get('/users/recipes', async (requestObj, responseObj) => {
    try {
        const users = await User.findAll({
            include: Recipe
        });

        responseObj.json(users);
    } catch (err) {
        console.log(err);
    }

});

//GET route to get a single user's recipes
router.get('/user/recipe/:user_id', async (requestObj, responseObj) => {

    const user_id = requestObj.params.user_id;

    try {
        const user = await User.findOne({
            where: {
                id: user_id
            },
            include: Recipe
        });

        responseObj.json(user);
    } catch (err) {
        console.log('error', err);
    }
});

//DELETE route to remove a user from database (HW 11!)
router.delete('/user/:id', async (requestObj, responseObj) => {

    const user_id = requestObj.params.id;

    try {
        //Run a query to delete a user from the table by user_id
        await User.destroy({
            where: {
                id: user_id
            }
        });

        responseObj.send({
            message: 'User deleted successfully'
        });
    } catch (err) {
        console.log(err);
    }

});

module.exports = router;