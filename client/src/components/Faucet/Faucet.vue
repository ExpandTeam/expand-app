<template>
    <div class="w3-display-middle w3-container w3-light-grey w3-center" style="padding: 2rem;">
        <h2 class="w3-center">The Faucet of Life</h2>
        <button v-on:click="takeExpand(20)" class="w3-button w3-blue">Give me 20 E</button>
        <p style="color: green">{{ result }}</p>
    </div>
</template>

<script>
import expandTokenInfo from '@/../../truffle/build/contracts/ExpandToken';

export default {
    name: 'Faucet',
    data () {
        return {
            web3: this.$store.state.web3,
            result: '',
        };
    },
    methods: {
        takeExpand (amount) {
            const web3Instance = this._data.web3.web3Instance();
            const contract = new web3Instance.eth.Contract(expandTokenInfo.abi, process.env.EXPAND_CONTRACT_ADDRESS);
            contract.methods.getTokens(amount * Math.pow(10, 18)).send({ from: this._data.web3.coinbase })
                .then((resp) => {
                    this._data.result = 'Success';
                })
                .catch((err) => {
                    console.log(err);
                });
        },
    },
};
</script>
