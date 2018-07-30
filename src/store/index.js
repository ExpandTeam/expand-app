import Vue from 'vue';
import Vuex from 'vuex';
import state from './state';
import getWeb3 from '../util/get-web3';

Vue.use(Vuex);

function registerWeb3 ({ commit }) {
    getWeb3.then(result => {
        commit('registerWeb3Instance', result);
    }).catch(e => {
        console.log('error in action registerWeb3', e);
    });
}

function registerWeb3Instance (state, payload) {
    let result = payload;
    let web3Copy = state.web3;
    web3Copy.coinbase = result.coinbase;
    web3Copy.networkId = result.networkId;
    web3Copy.balance = parseInt(result.balance, 10);
    web3Copy.isInjected = result.injectedWeb3;
    web3Copy.web3Instance = result.web3;
    state.web3 = web3Copy;
}

export const store = new Vuex.Store({
    strict: true,
    state,
    mutations: { registerWeb3Instance },
    actions: { registerWeb3 },
});
