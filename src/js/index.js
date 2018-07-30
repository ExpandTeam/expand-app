'use strict';

import Web3 from 'web3';

if (typeof web3 !== 'undefined') {
    console.log('Using web3 detected from external source like Metamask');
    web3 = new Web3(web3.currentProvider);
} else {
    web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
}

function deployContract (title, body) {
    const articleContract = new web3.eth.contract(Article.abi);
    const articleData = articleContract.new.getData(
        title,
        body, {
            data: Article.data,
        },
    );
    const estimate = web3.eth.estimateGas({ data: articleData, });
    const article = articleContract.new(
        title,
        body, {
            from: web3.eth.accounts[0],
            data: Article.data,
            gas: estimate,
        }
    );
}
