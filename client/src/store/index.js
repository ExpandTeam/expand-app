import Vue from 'vue';
import Vuex from 'vuex';
import state from './state';
import getWeb3 from '../util/get-web3';
import Buzz from '@web3/buzz';
import { analyticsMiddleware } from 'vue-analytics';

Vue.use(Vuex);

function registerWeb3 ({ commit }) {
    getWeb3
        .then((result) => {
            commit('registerWeb3Instance', result);
        })
        .then(getUserInfo)
        .then((user) => {
            commit('setUserInfo', user);
        }).catch((e) => {
            console.error(e);
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
    web3Copy.bzz = new Buzz({ provider: process.env.SWARM_ENDPOINT });
    web3Copy.anonymous = result.anonymous;
    state.web3 = web3Copy;
}

function getUserInfo () {
    if (!state.anonymous) {
        return fetch(process.env.ROOT_API + '/user?address=' + state.web3.coinbase)
            .then((res) => {
                return res.json();
            });
    } else {
        return null;
    }
}

function setUserInfo (state, userInfo) {
    if (userInfo) {
        state.user = {
            displayName: userInfo.username,
        };
    } else if (state.anonymous) {
        state.user = null;
    } else {
        state.user = {
            displayName: state.web3.coinbase,
        };
    }
}

export const store = new Vuex.Store({
    strict: true,
    state,
    mutations: { registerWeb3Instance, setUserInfo },
    actions: { registerWeb3, getUserInfo },
    plugins: [
        analyticsMiddleware,
    ],
});
