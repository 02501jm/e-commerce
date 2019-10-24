const mongoose = require('mongoose');

const itemSchema = mongoose.Schema({
    name: {type: String, required: true, default: 'item_name'},
    description: {type: String, required: true},
    price: {type: Number},
    sold: {type: Number},
    followers: {type: Number},
    rating: {type: Number},
    comments: {type: String}, 
    time: {type: number}
});

module.exports = mongoose.model('Item', itemSchema);