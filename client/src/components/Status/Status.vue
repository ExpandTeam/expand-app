<template>
<div>

  <div>

    <!-- left -->
    <div class="w3-display-middle w3-light-grey" style="padding: 5rem;">
      <div class="w3-container w3-light-grey">
        <h1 class="w3-center">Current Status</h1>
        <ul class="w3-ul">
          <li>
            <h2 v-if="!web3.isInjected || web3.networkId != 'ropsten'" class="w3-center w3-red">Metamask ⚠️</h2>
            <h2 v-else class="w3-center w3-green">Metamask 🆗</h2>
            <ul class="w3-ul w3-light-grey">
              <li>Metamask: {{ web3.isInjected }}</li>
              <li v-if="web3.networkId === 'ropsten'">Network: {{ web3.networkId }}</li>
              <li v-else class="w3-red">Network: {{ web3.networkId }}</li>
              <li>Account: {{ web3.coinbase }}</li>
              <li v-if="web3.balance < 1000000000000000" class="w3-orange w3-text-white">Balance: {{ web3.balance }} wei</li>
              <li v-else class="">Balance: {{ web3.balance }} wei</li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
    <br>
    <br>
  </div>
</div>
<!--
      <div v-if="web3.isInjected">
        <div class="w3-container">
        <div v-if="web3.networkId != 'ropsten'">
          <h1 class="w3-center w3-orange w3-text-white">Warning</h1>
          <p>Metamask: {{ web3.isInjected }}</p>
          <p class="w3-red">Network: {{ web3.networkId }}</p>
          <p>Account: {{ web3.coinbase }}</p>
          <p>Balance: {{ web3.balance }}</p>
        </div>
        <div v-else>
        <h1 class="w3-center w3-blue w3-text-white">Ready</h1>
        <p>Metamask: {{ web3.isInjected }}</p>
        <p>Network: {{ web3.networkId }}</p>
        <p>Account: {{ web3.coinbase }}</p>
        <p>Balance: {{ web3.balance }}</p>
        </div>
      </div>
        <button class="w3-button w3-green w3-bar">New Article</button>
        <button class="w3-button w3-bar w3-orange w3-text-white">View Articles</button>
      </div>
      <div v-else class="w3-black w3-display-middle w3-animate-opacity" style="">
        <h1 class="w3-center w3-red">Not Ready</h1>
        <p>Metamask: {{ web3.isInjected }}</p>
        <p>Please login to Metamask.</p>
      </div>
      </div>
      -->
</template>
<script>
/* eslint-disable */
export default {
  name: 'Home',
  computed: {
    web3() {
      return this.$store.state.web3;
    },
  },
  methods: {
    getTransactions() {
      console.log("GO!");
      var t = [];
      web3.eth.filter("pending").watch(
        function(error, result) {
          if (!error) {
            t.push(result);
          } else {
            console.log(error);
          }
        }
      );
    }
  }
};

</script>
