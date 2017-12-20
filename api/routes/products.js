const express = require('express');
const router = express.Router();
const _ = require('lodash');

const Product = require('./../models/product');

//ROOT
router.get('/', (req, res, next) => {
    Product.find({})
        .then((docs) => {
            res.status(200).json(docs);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({ error: err });
        });
});

// POST 
router.post('/', (req, res, next) => {
    const product = new Product({
        name: req.body.name,
        price: req.body.price
    });

    //ADD TO DATABASE
    product
        .save()
        .then((result) => {
            console.log(result);
            res.status(201).json({
                message: 'Product Added Successfully',
                product
            });
        })
        .catch((err) => {
            console.log('ERROR: Product Added POST /products');
            res.status(500).json(err);
        });
});

// GET/:id
router.get('/:id', (req, res, next) => {
    const id = req.params.id;
    Product.findById(id)
        .exec()
        .then((doc) => {
            console.log(doc);
            if (doc) {
                res.status(200).json(doc);
            } else {
                res.status(404).json({ message: 'No Product Found' });
            }
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

//PATCH or UPDATE
router.patch('/:id', (req, res, next) => {
    const id = req.params.id;
    //Pull things user can have access
    const productBody = _.pick(req.body, ['name', 'price']);

    Product.findByIdAndUpdate(id,
        { $set: productBody },
        { new: true })
        .then((doc) => {
            res.status(200).json({
                message: 'Product Updated Successfully',
                doc
            });
        })
        .catch((err) => res.status(404))

});

// DELETE 
router.delete('/:id', (req, res, next) => {
    const id = req.params.id;
    Product.findByIdAndRemove(id)
        .then((result) => {
            if (result) {
                res.status(200).json({
                    message: 'Product Deleted',
                    id: req.params.id,
                    name: result.name
                });
            } else {
                res.status(404).json({ error: '0 rows affected' });
            }
            console.log(result);
        })
        .catch((err) => {
            res.status(500).json({ error: err });
        });
});

module.exports = router;