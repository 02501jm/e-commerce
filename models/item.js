const mongoose = require('mongoose');

const itemSchema = mongoose.Schema({
    name: {type: String, required: true, default: 'item_name'},
    description: {type: String, required: true}
});

module.exports = mongoose.model('Item', itemSchema);