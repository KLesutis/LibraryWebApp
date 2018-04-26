const mongoose = require('mongoose');

const bookSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: {type:String, required: true},
    releaseDate: {type:Date, required: true},
    pages: {type:Number, required: true},
    quantity: {type:Number, required: true},
    author: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Author', required: false }]

});

module.exports = mongoose.model('Book', bookSchema);