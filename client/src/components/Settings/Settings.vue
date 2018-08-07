<template>
    <div class="w3-container w3-display-middle w3-light-grey" style="box-shadow:0 10px 16px 0 rgba(0,0,0,0.2),0 6px 20px 0 rgba(0,0,0,0.19); padding: 30px;">
        <h2 class="w3-center">Settings</h2>
        <div>
            <label>Display Name</label>
            <input class="w3-input" type="text" v-model="displayName" />
        </div>
        <br>
        <button v-on:click="updateMappings" class="w3-button w3-green" style="margin: 0 auto; display: block;">Update</button>
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
            }, (err, result) => {
                if (err) {
                    return console.error(err);
                } else {
                    this.$http.post(
                        process.env.ROOT_API + '/user/update', {
                            signed: result.result,
                            username: this.displayName,
                        }, {
                            emulateJSON: true,
                        },
                    ).then(() => {
                        this.$store.dispatch('getUserInfo')
                            .then((userInfo) => {
                                this.$store.commit('setUserInfo', userInfo);
                            });
                    }).catch((err) => {
                        console.error(err);
                    });
                }
            });
        },
    },
    data () {
        return {
            user: this.$store.state.user,
            displayName: this.$store.state.user.displayName,
        };
    },
};
</script>
