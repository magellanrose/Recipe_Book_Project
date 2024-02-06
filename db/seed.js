const { faker } = require('@faker-js/faker');
const User = require('../models/User');
const Recipe = require('../models/Recipe');
const db = require('./connection');

const userData = [];

let amount = 10;

while (amount--) {
    userData.push({
        username: faker.internet.userName(),
        email: faker.internet.email(),
        password: 'password123'
    });
}





async function seed() {

    try {
        await db.sync({
            force: true
        })


        console.log('Tables created');

        const users = await User.bulkCreate(userData);

        console.log('users seeded successfully');


        for (let user of users) {
            const recipes = [];
            let recipeCount = 5;

            while (recipeCount--) {
                recipes.push({
                    title: faker.word.noun(),
                    recipe: faker.lorem.sentence(),
                    ingredients: 'turtles, carrots, potatoes, pickles',
                    userId: user.id
                })
            }

            try {
                await Recipe.bulkCreate(recipes)
            } catch (err) {
                console.log(err);
            }
        }

        console.log('recipes added');

        process.exit();
    } catch (err) {
        console.log(err);
    }
}

seed();