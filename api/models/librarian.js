const mongoose = require('mongoose');

const librarianSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    fname: {type:String, required: true},
    lname: {type:String, required: true},
    phoneNumber: {type:String, required: true},
    email: {type:String, required: true}

});

module.exports = mongoose.model('Librarian', librarianSchema);