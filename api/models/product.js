const mongoose = require('mongoose');

const product = mongoose.model('Product', {
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
});

module.exports = product;