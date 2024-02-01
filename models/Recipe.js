const { DataTypes, Model } = require('sequelize');
const sequelize = require('../db/connection');


class Recipe extends Model { }

Recipe.init({
    title: {
        type: DataTypes.STRING,
        allowNull: false,
        trim: true,
        validate: {
            notEmpty: {
                args: true,
                msg: 'Recipe name is required',
            },
        },
    },
    recipe: {
        type: DataTypes.STRING,
        allowNull: false,
        trim: true,
        validate: {
            notEmpty: {
                args: true,
                msg: 'Recipe is required',
            },
        },
    },
    ingredients: {
        type: DataTypes.DATE,
        allowNull: true,
        trim: true,
        validate: {
            args: true,
            msg: 'Ingredients required'
        }
    },
}, {
    sequelize,
    modelName: 'recipe',
});

// Define the association


module.exports = Recipe;