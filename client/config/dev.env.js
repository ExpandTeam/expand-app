'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
    NODE_ENV: '"development"',
    ROOT_API: '"http://localhost:3000/api"',
    SWARM_ENDPOINT: '"https://swarm-gateways.net"',
    EXPAND_CONTRACT_ADDRESS: '"0xB7340dCB64acD859811236bf5cEAEEAE0045072e"',
    PROVIDER_URI: '"https://ropsten.infura.io/v3/14d75bc3f2f0416cab0f584c40dbdd7d"',
});
