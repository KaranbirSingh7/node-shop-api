const express = require('express');
const router = express.Router();
const { ObjectID } = require('mongodb');

const Order = require('./../models/order');
const Product = require('./../models/product');

// GET /ORDER
router.get('/', (req, res, next) => {
    Order.find({})
        .then((docs) => {
            res.status(200).json(docs);
        })
        .catch((err) => { res.status(500).json({ error: err }); });
});

// POST /ORDER
router.post('/', (req, res, next) => {
    const productId = req.body.product;
    // 1. Check ID VALID || NOT
    if (!ObjectID.isValid(productId)) {
        return res.status(500).json({
            message: 'ProductID is not valid'
        });
    }
    // 2. Product is in shop or not
    Product.findById(productId)
        .then((result) => {
            if (!result) {
                return res.status(500).json({message: 'Product that you are looking isn\'t available '});
            }
            const order = new Order({
                //Result will return product ID
                product: result._id,
                quantity: req.body.quantity
            });
            return order.save();
        })
        .then((doc) => {
            res.status(200).json(doc);
        })
        .catch((err) => { res.status(500).json({ error: err }); });
});

// GET / ORDER by ID
router.get('/:id', (req, res, next) => {
    const id = req.params.id;
    //Check if id is valid or not
    if (!ObjectID.isValid(id)) {
        return res.status(500).json({
            message: 'ID is not valid'
        });
    }

    Order.findById(id)
        .then((order) => {
            if (!order) {
                return res.status(404).json({ message: 'NO Order found with listed ID' });
            }
            res.status(401).json(result);
        })
        .catch((err) => res.status(500).json({ error: err }));
});

// DELETE ORDER
router.delete('/:id', (req, res, next) => {
    const id = req.params.id;
    if (!ObjectID.isValid(id)) {
        return res.status(500).json({
            message: 'ID is not valid'
        });
    }

    Order.findByIdAndRemove(id)
        .then(result => {
            if (!result) {
                return res.status(404).json({ message: 'NO Order found with listed ID' });
            }
            res.status(401).json({
                message: 'Order DELETED',
                result
            });
        })
        .catch(err => res.status(500).json({ error: err }));
});

module.exports = router;
