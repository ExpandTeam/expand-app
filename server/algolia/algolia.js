const algoliasearch = require('algoliasearch')

let client = algoliasearch('NMF6ZVXSCJ', '56202b8523a1510e33ee74ac7a0333e8');
let index = client.initIndex('articles');

module.exports = index;
