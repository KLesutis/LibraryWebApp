const mongoose = require('mongoose');

const readerSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    fname: {type:String, required: true},
    lname: {type:String, required: true},
    phoneNumber: {type:String, required: true},
    email: {type:String, required: true},
    orders: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Order', required: false }]
});

module.exports = mongoose.model('Reader', readerSchema);