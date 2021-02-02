const mongoose = require('mongoose');

const quoteSchema = new mongoose.Schema({
    title: String,
    body: String,
    author: String,
    created_at: {type: Date, default: Date.now()}
});

const quoteModel = mongoose.model('quoteModel', quoteSchema);

module.exports = quoteModel;