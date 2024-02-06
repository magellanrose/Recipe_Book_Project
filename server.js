const db = require('./db/connection');

const express = require('express');
require('dotenv').config()

const { engine } = require('express-handlebars');

const session = require('express-session');


const user_routes = require('./routes/user_routes');
const recipe_routes = require('./routes/recipe_routes');
const view_routes = require('./routes/view_routes');
const form_routes = require('./routes/form_routes');

const PORT = process.env.PORT || 4444;

const app = express();


// const db = require('./db/connection');

app.use(express.json());

app.use(express.urlencoded({ extended: false }));

app.use(express.static('./public'));





// Set up handlebars
app.engine('hbs', engine({ extname: '.hbs' }));
app.set('view engine', 'hbs');
app.set('views', './views');

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    // cookie: { maxAge: 60 * 60 * 1000 }
}));


// Load Routes
app.use('/api', [user_routes, recipe_routes, view_routes]);
app.use('/', [view_routes, form_routes]);

db.sync({ force: false })
    .then(() => {
        app.listen(PORT, () => {
            console.log('Server started on port', PORT)
        });
    });