//Imported Dependecies
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('./db/mongoose');

//Import Local Libraries
const productRoutes = require('./api/routes/products');
const orderRoutes = require('./api/routes/orders');

const app = express();

//Log req to console
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url} ${(new Date().toString())}`);
    next();
});
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');
   
    if (req.method === 'OPTIONS'){
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, GET, DELETE');
        return res.status(201);
    }
    next();
});

//Routes
app.use('/products', productRoutes);
app.use('/orders', orderRoutes);

//Handle  error 
app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
});
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({
        message: err.message
    });
});

module.exports = app;