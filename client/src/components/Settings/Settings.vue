<template>
    <div>
        <h2>Settings</h2>
        <div>
            <label>Display Name</label>
            <input type="text" v-model="displayName" />
        </div>
        <button v-on:click="updateMappings">Update</button>
    </div>
</template>

<script>
export default {
    name: 'Settings',
    methods: {
        updateMappings () {
            const web3 = this.$store.state.web3;
            const web3Instance = web3.web3Instance();
            const msgParams = [{
                type: 'string',
                name: 'Message',
                value: 'I am who I say I am :)',
            }];
            web3Instance.currentProvider.sendAsync({
                method: 'eth_signTypedData',
                params: [msgParams, web3.coinbase],
                from: web3.coinbase,
            }, function (err, result) {
                if (err) {
                    return console.error(err);
                }
                console.log(result);
            });
        },
    },
    data () {
        return {
            displayName: this.$store.state.web3.coinbase,
        };
    },
};
</script>
