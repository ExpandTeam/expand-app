<template>
<div style="word-wrap:break-word;">
  <div class="w3-container w3-center">
    <header class="w3-blue">
      <h1>{{displayName}}</h1>
    </header>
    <div class="w3-half w3-light-grey ">
      <h1 v-on:click="usr()">Profile</h1>
      <div class="w3-container">
      <ul class="w3-ul">
        <li>Username: {{user.displayName}}</li>
        <li>Evaluated Username: "{{displayName}}"</li>
        <li>Evaluted and Shortened Username: "{{shortenedDisplayName}}"</li>
        <li>Address: <code><small>{{web3.coinbase}}</small></code></li>
        <li v-if="!isNaN(web3.balance)">Balance: ~{{((web3.balance / Math.pow(10,18)).toFixed(2))}} ETH</li>
        <li v-else>Balance: N/A</li>
      </ul>
    </div>
    </div>
    <div class="w3-half w3-light-grey">
      <h1>Status</h1>
      <div class="w3-container w3-light-grey">
        <ul class="w3-ul">
          <li v-if="web3.networkId === 'ropsten'">Network: {{web3.networkId}}</li>
          <li v-else class="w3-red">Network: {{web3.networkId}}</li>
          <li v-if="web3.isInjected">Ether client ready: {{web3.isInjected}}</li>
          <li v-else class="w3-red">Metamask/Infura ready: {{web3.isInjected}} <router-link to="/setup"></router-link></li>
          <li v-if="web3.anonymous" class="w3-orange w3-text-white">Running anonymously/logged out: {{web3.anonymous}}</li>
          <li v-else>Running anonymously/logged out: {{web3.anonymous}}</li>
          <li v-if="web3.bzz">Swarm connected: {{new Boolean(web3.bzz)}}</li>
          <li v-else class="w3-red">Swarm connected: {{new Boolean(web3.bzz)}} (Server error)</li>
          <li>Status code: {{status}}</li>
        </ul>
        <div v-if="status === 3" class="w3-panel w3-pale-green w3-leftbar w3-border-green">
          <h3>Status OK!</h3>
        </div>
        <div v-if="web3.networkId !== 'ropsten'" class="w3-panel w3-pale-red w3-leftbar w3-border-red">
          <h3>Incorrect Network</h3>
          <p>
            You're running on the Main Ethereum Network (or other network). We require the use of the Ropsten Test Network as our main decentralized article hosting service is in beta, as are we. We cannot provide service otherwise!
          </p>
        </div>
        <div v-if="web3.anonymous" class="w3-panel w3-pale-yellow w3-leftbar w3-border-yellow">
          <h3>Running Anonymous/Not Logged In</h3>
          <p>
            You're running anonymously. This means that you won't be able to post any articles, but you can view them.
            Please install/login to Metamask or other client to be able to post articles.
          </p>
        </div>
        <div v-if="!web3.isInjected" class="w3-panel w3-pale-red w3-leftbar w3-border-red">
          <h3>Injection Failure</h3>
          <p>
          Uh oh, looks like we can't inject web3. This might be a problem with your internet connection because Metamask/Infura cannot inject into the app.
          If your internet connection is working fine and you're using Metamask, try reinstalling the application. Otherwise, please come back later.
          </p>
        </div>
        <div v-if="!web3.bzz" class="w3-panel w3-pale-red w3-leftbar w3-border-red">
          <h3>Swarm Connection Failure</h3>
          <p>
            There seems to be an issue connecting to Swarm decentralized content distrubtion service. This is the service we require to keep all articles anonymous and decentralized. Please come back later or check your internet.
          </p>
        </div>
      </div>
    </div>
  </div>
</div>
</template>
<script>
/* eslint-disable */
export default {
  name: 'Home',
  computed: {
    web3() {
      return this.$store.state.web3;
    },
    user () {
        return this.$store.state.user;
    },
    status () {
        // status codes:
        // 0 - fatal error, no web3 injection available - metamask does not exist
        // 1 - warning, not connected to ropsten,
        // 2 - no warning, running anonymously
        // 3 - all is well
        var web3 = this.$store.state.web3;
        if (!web3.isInjected) {
            return 0;
        } else if (web3.networkId !== 'ropsten') {
            return 1;
        } else if (web3.anonymous) {
            return 2;
        } else {
            return 3;
        }
    },
    displayName () {
        var username = this.user.displayName;
        var status = this.status;
        if (status === 0) { // could not inject
            return 'Error';
        } else if (status === 1 || status === 2) { // anon mode or bad network
            return 'Unauthenticated';
        } else if (username === null) { // ok, but have no username
            return this.web3.coinbase.substring(0, 8);
        } else if (username === '') {
            return '(empty)';
        } else {
            return username;
        }
    },
    shortenedDisplayName () {
        var username = this.user.displayName;
        var status = this.status;
        if (status === 0) { // could not inject
            return 'Error';
        } else if (status === 1 || status === 2) { // anon mode or bad network
            return 'Unauthenticated';
        } else if (username === null) { // ok, but have no username
            return this.web3.coinbase.substring(0, 8) + '...';
        } else if (username === '') {
            return '(empty)';
        } else if (username.length >= 8) { // we ok, just clip the name
            return username.substring(0, 8) + '...';
        } else {
            return username;
        }
    },
  },
  methods: {
    usr () {
      console.log(this.web3);
    }
  },
};

</script>
