<template>
  <!-- top navbar -->
  <nav class="w3-text-white">
      <router-link to="/" class="w3-button">Home</router-link>
      <router-link to="/about" class="w3-button">About</router-link>
      <router-link to="/editor" class="w3-button">Create</router-link>
      <router-link to="/faucet" class="w3-button">Faucet</router-link>
      <router-link v-if="web3.isInjected && web3.networkId === 'ropsten'" to="/status" class="w3-button w3-border-green w3-border-bottom">🆗 Status</router-link>
      <router-link v-else to="/status" class="w3-button w3-border-bottom w3-border-red w3-animate-fading" style="animation-duration:0.5s">⚠️ Status</router-link>
      <router-link to="/search" class="w3-button">Search</router-link>
  </nav>
  <!-- end top navbar -->
</template>

<script>
export default {
    name: 'Navigation',
    computed: {
        web3 () {
            return this.$store.state.web3;
        },
        user () {
            return this.$store.state.user;
        },
    },
};
</script>
