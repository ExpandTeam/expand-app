const express = require('express');
const mongoose = require('mongoose');
const sigUtil = require('eth-sig-util');

const models = require('../models/models');
const User = models.User

let router = express.Router();

router.post('/user/update', function (req, res) {
    const data = [{
        type: 'string',
        name: 'Message',
        value: 'I am who I say I am :)',
    }];

    const sig = req.body.signed;

    let address = sigUtil.recoverTypedSignatureLegacy({ data, sig });

    const newUser = new User({
        _id: address,
        username: req.body.username,
    });

    User.findByIdAndUpdate(newUser._id, newUser, { upsert: true }, (err) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send('OK');
        }
    });
});

router.get('/user', function (req, res) {
    const address = req.query.address;
    User.findById(address, function (err, doc) {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).json(doc);
        }
    });
});

module.exports = router;
