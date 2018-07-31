<template>
    <div v-if="web3.isInjected">
      <p>Metamask: {{ web3.isInjected }}</p>
      <p>Network: {{ web3.networkId }}</p>
      <p>Account: {{ web3.coinbase }}</p>
      <p>Balance: {{ web3.balance }}</p>
    </div>
    <h1 v-else>Sign in to Metamask and refresh the page</h1>
</template>

<script>
export default {
    name: 'Home',
    computed: {
        web3 () {
            return this.$store.state.web3;
        },
    },
};
</script>
