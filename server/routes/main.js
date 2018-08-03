"use strict";

const express = require('express');
const mongoose = require('mongoose');
const sigUtil = require('eth-sig-util');
const h2p = require('html2plaintext');

const Web3 = require('web3');
const web3 = new Web3(new Web3.providers.HttpProvider(process.env.PROVIDER_URI));

const Buzz = require('@web3/buzz');
const bzz = new Buzz({ provider: process.env.SWARM_ENDPOINT });

const models = require('../models/models');
const User = models.User;
const Article = models.Article;

const articleInfo = require('../../truffle/build/contracts/Article');
let router = express.Router();

router.post('/user/update', (req, res) => {
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

router.get('/user', (req, res) => {
    const address = req.query.address;
    User.findById(address, function (err, doc) {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).json(doc);
        }
    });
});

router.post('/article/update', (req, res) => {
    const address = req.body.address;
    const contract = new web3.eth.Contract(articleInfo.abi, address);
    contract.methods.hash().call()
        .then((hash) => {
            return bzz.download(hash);
        })
        .then((body) => {
            body = Buffer.from(body).toString('utf8');
            Promise.all([contract.methods.title().call(), contract.methods.owner().call()])
                .then((contractData) => {
                    let newArticle = new Article({
                        _id: address,
                        body: h2p(body),
                        title: contractData[0],
                        owner: contractData[1],
                    })

                    let upsertData = newArticle.toObject();

                    Article.findByIdAndUpdate(req.body.address, upsertData, {upsert: true}, ((err) => {
                        if (err) {
                            console.log(err);
                            res.status(500).send("newArticle could not be saved");
                        } else {
                            console.log("Article added to database");
                            res.status(200).json(h2p(body));
                        }
                    }));
                })
                .catch((err) => {
                    console.log(err);
                });
        })
        .catch((err) => {
            console.log(err);
        });
});

router.get('/article', (req, res) => {
    const numArticlesOnPage = 5;

    if( !(req.query.search && typeof req.query.search === 'string')) {
        res.status(400).send("request must have search query");
        return;
    }


    Article
        .find({})
        .where([]).in(['title', 'body'])
        .skip(numArticlesOnPage * (pageNumber - 1))
        .limit(numArticlesOnPage)
        .populate('owner')
        .exec(function(err, results) {
            if(err) {
                console.log(err);
                res.status(500).send('unable to get articles');
                return;
            }

            const paredArticles = articles.map((article) => (
                {
                    address: article._id,
                    title: article.title,
                    authorName: article.owner.displayName,
                }
            ));
            res.status(200).json(paredArticles);
        });

})


module.exports = router;
