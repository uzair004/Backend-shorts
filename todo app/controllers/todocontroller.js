const bodyParser = require('body-parser');
const mongoose = require('mongoose');

//create database connection
mongoose.connect("mongodb+srv://test:test@todo.xalgj.mongodb.net/todo?retryWrites=true&w=majority", {useNewUrlParser: true });

//create a schema - this is like a blueprint
const todoSchema = new mongoose.Schema({
    item: String
});

// create model 
const Todo = mongoose.model('Todo', todoSchema);

const urlencodedParser = bodyParser.urlencoded({extended: false});

module.exports = function(app) {

    app.get('/todo', function(req, res) {
        //get all data from database
        Todo.find({}, function(err, data) {
            if(err) throw err;
            // render view
            res.render('todo', {todos: data});
        })
    });

    app.post('/todo', urlencodedParser, function(req, res) {
        // get data & save in mongodb
        const newTodo = Todo(req.body).save(function(err, data) {
            if(err) throw err;
            res.json(data);
        })
    });

    app.delete('/todo/:item', function(req, res) {
        // delete the requested item from database
        Todo.find({item: req.params.item.replace(/\-/g, " ")}).deleteOne(function(err, data) {
            if(err) throw err;
            res.json(data);
        })
    });

};