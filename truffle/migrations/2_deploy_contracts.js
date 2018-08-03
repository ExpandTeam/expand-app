const ExpandToken = artifacts.require('ExpandToken');
const owner = '0x545d195BC70509dc23E08FE8817f2F89cd6E1E3f';

module.exports = function (deployer) {
    deployer.deploy(ExpandToken, owner);
};
