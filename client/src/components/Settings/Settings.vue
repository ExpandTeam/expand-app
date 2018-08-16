<template>
<!-- center container with shadow -->
<div class="w3-container w3-display-middle w3-light-grey shadow">
  <h2 class="w3-center">Settings</h2>
  <div>
    <label>Display Name</label>
    <input class="w3-input" type="text" v-model="displayName" />
  </div>
  <br>
  <button v-on:click="updateMappings" class="w3-button w3-green block-center">Update</button>
</div>
<!-- end container -->
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
