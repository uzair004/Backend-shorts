const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config();
const path = require('path');
const quote = require('./models/quote.js');

const port = process.env.PUBLIC_PORT || 3000;

app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(express.static(`${__dirname}/public`));

// ROUTES
app.get('/', (req, res) => {
    res.sendFile(path.join(`${__dirname}/public/quotes/quotes.html`));
});

app.get('/viewquotes', (req, res) => {
    res.sendFile(path.join(`${__dirname}/views/viewquotes.html`));
});

app.post('/post', async (req, res) => {
    const newQuote = new quote();
    newQuote.title = req.body.title;
    newQuote.body = req.body.body;
    newQuote.author = req.body.author;
    try {
        const savedQuote = await newQuote.save();
        res.redirect('/viewquotes');
    } catch(err) {
        res.send(err);
    }
});

app.get('/get/quotes', async (req, res) => {
    try {
        const data = await quote.find({});
        res.send(data);
    } catch(err) {
        console.log(`Can't fetch quotes ${err}`);
    }
});

app.post('/delete/:id/quote', async (req, res) => {
    await quote.findOneAndDelete({_id: req.params.id});
    res.redirect('/viewquotes');
});



// connect to mongodb
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
 .catch(err => console.log(`OOPS can't connect to Database becasue ${err.reason}`));

// server created
app.listen(port, () => console.log(`Server listening at port ${port}`));