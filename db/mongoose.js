const mongoose = require('mongoose');

//Depreciation Problem
mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost:27017/ShopApp', {
    useMongoClient: true
});

module.exports = mongoose;