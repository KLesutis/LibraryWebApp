const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    librarian: { type: mongoose.Schema.Types.ObjectId, ref: 'Librarian', required: true },
    reader: { type: mongoose.Schema.Types.ObjectId, ref: 'Reader', required: true },
    books: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true }],
    returnDate: { type:Date, required: true,deault: Date.now + 7  },
    takenDate: { type:Date, required: true,deault: Date.now }


});

module.exports = mongoose.model('Order', orderSchema);