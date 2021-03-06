// https://gist.github.com/kyriediculous/54ceb4a54b2da170b0553ca3af7d8fbe#file-getweb3-js

import Web3 from 'web3';

let getWeb3 = new Promise(function (resolve, reject) {
    // Check for injected web3 (mist/metamask)
    var web3js = window.web3;
    let web3;
    let anonymous = false;
    if (typeof web3js !== 'undefined') {
        web3 = new Web3(web3js.currentProvider);
    } else {
        anonymous = true;
        web3 = new Web3(new Web3.providers.WebsocketProvider(process.env.PROVIDER_URI));
    }
    web3.eth.net.isListening().then((isConnected) => {
        resolve({
            anonymous,
            injectedWeb3: isConnected,
            web3 () {
                return web3;
            },
        });
    });
})
    .then((result) => {
        return new Promise(function (resolve, reject) {
            // Retrieve network ID
            result.web3().eth.net.getNetworkType((err, networkId) => {
                if (err) {
                    // If we can't find a networkId keep result the same and reject the promise
                    reject(new Error('Unable to retrieve network ID'));
                } else {
                    // Assign the networkId property to our result and resolve promise
                    result = Object.assign({}, result, {networkId});
                    resolve(result);
                }
            });
        });
    })
    .then((result) => {
        return new Promise(function (resolve, reject) {
            if (!result.anonymous) {
                // Retrieve coinbase
                result.web3().eth.getCoinbase((err, coinbase) => {
                    if (err) {
                        reject(new Error('Unable to retrieve coinbase'));
                    } else {
                        if (!coinbase) {
                            result.anonymous = true;
                        }
                        result = Object.assign({}, result, { coinbase });
                        resolve(result);
                    }
                });
            } else {
                resolve(result);
            }
        });
    })
    .then((result) => {
        return new Promise(function (resolve, reject) {
            if (!result.anonymous) {
                // Retrieve balance for coinbase
                result.web3().eth.getBalance(result.coinbase, (err, balance) => {
                    if (err) {
                        reject(new Error('Unable to retrieve balance for address: ' + result.coinbase));
                    } else {
                        result = Object.assign({}, result, { balance });
                        resolve(result);
                    }
                });
            } else {
                resolve(result);
            }
        });
    });

export default getWeb3;
