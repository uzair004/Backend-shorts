const express = require('express');

const todoController = require('./controllers/todocontroller');

const app = express();

//set up template engine
app.set('view engine', 'ejs');

// static files
app.use(express.static('./public'));

todoController(app);

// listen to port
app.listen(8080);
console.log('Listening at port 8080');