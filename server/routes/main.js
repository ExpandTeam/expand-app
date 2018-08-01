const express = require('express');
const mongoose = require('mongoose');
const sigUtil = require('eth-sig-util');

const models = require('../models/models');
const User = models.User

let router = express.Router();


router.post('/user/update', function (req, res) {
    //console.log(req.body);


    const data = [{
    type: 'string',
    name: 'Message',
    value: 'I am who I say I am :)',
    }]

    const sig = req.body.signed;

    let address = sigUtil.recoverTypedSignatureLegacy({data, sig});

    //console.log(address);

    const newUser = new User({
        _id: address,
        username: req.body.username,
    });
    //console.log(address);
    //console.log(newUser);

    newUser.save((err) => {
    if(err) {
        console.log(err);
        res.status(500).send(err);
    } else {
        //console.log('Username was updated');
        res.status(200).send('OK');
    }
    });
});


module.exports = router;
