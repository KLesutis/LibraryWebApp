const mongoose = require('mongoose');

const authorSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    fname: {type:String, required: true},
    lname: {type:String, required: true},
    pseudonym: {type:String, required: false},
    birthDate: {type:Date, required: true},
    deadDate: {type:Date, required: false},
    books: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: false }]
});

module.exports = mongoose.model('Author', authorSchema);