const express = require('express');

const { engine } = require('express-handlebars');

const session = require('express-session');







// Set up handlebars
app.engine('hbs', engine({ extname: '.hbs' }));
app.set('view engine', 'hbs');
app.set('views', './views');