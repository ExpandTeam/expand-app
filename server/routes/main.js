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

const algoliasearch = require('algoliasearch')
const client = algoliasearch(process.env.ALGOLIA_APPLICATION_ID, process.env.ALGOLIA_API_KEY);
const index = client.initIndex('articles');

router.post('/user/update', (req, res) => {
    const data = [{
        type: 'string',
        name: 'Message',
        value: 'I am who I say I am :)',
    }];

    const sig = req.body.signed;

    let address = sigUtil.recoverTypedSignatureLegacy({ data, sig }).toLowerCase();

    const newUser = new User({
        _id: address,
        username: req.body.username,
    });

    User.findByIdAndUpdate(address, newUser, { upsert: true }, (err) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send('OK');
        }
    });
});

router.get('/user', (req, res) => {
    const address = req.query.address.toLowerCase();
    User.findById(address, function (err, doc) {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).json(doc);
        }
    });
});

router.get('/article', (req, res) => {
    index.search(
        {
            query: req.query.search,
            attributesToRetrieve: ['title', 'owner', '_id', 'body'],
        },
        function searchDone(err, content) {
            if (err) {
                console.log(err);
                res.status(500).send("unable to search");
                return;
            };


            const { hits } = content;
            console.log(hits);
            res.status(200).json(hits.map((hit) => ({address: hit._id, owner: hit.owner, title: hit.title, body: hit.body})));

        }
    );
})

router.post('/article/update', (req, res) => {
    const address = req.body.address.toLowerCase();
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

                    Article.findByIdAndUpdate(newArticle._id, newArticle, {upsert: true}, ((err) => {
                        if (err) {
                            console.log(err);
                            res.status(500).send("newArticle could not be saved");
                        } else {
                            console.log("Article added to database");
                            index.addObject((upsertData), (err) => {
                                if(err){
                                    throw err
                                } else {
                                    console.log("Article added to algolia")
                                }
                            });
                            res.status(200).json(body);
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

module.exports = router;
