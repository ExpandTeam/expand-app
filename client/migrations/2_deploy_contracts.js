const Article = artifacts.require('./article.sol');

module.exports = function (deployer) {
    deployer.deploy("An Interesting Title", "An Interesting Body", { gas: 300000 });
}
