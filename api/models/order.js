const mongoose = require('mongoose');

const order = mongoose.model('Order', {
    product: {
        type: mongoose.Schema.Types.ObjectId,
        //Reference is linking Order table to Product just like SQL
        ref: 'Product'
    },
    quantity: {
        type: Number,
        default: 1
    }
});

module.exports = order;