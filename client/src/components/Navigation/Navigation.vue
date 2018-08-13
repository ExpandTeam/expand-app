<template>
<div>
  <link rel='stylesheet' href='./static/navigation.css'>
  <div>
  <nav class='w3-text-white'>
    <router-link to='/' class='w3-button'>Home</router-link>
    <router-link to='/about' class='w3-button'>About</router-link>
    <router-link to='/editor' class='w3-button'>Create</router-link>
    <router-link to='/faucet' class='w3-button'>Faucet</router-link>
    <router-link to='/search' class='w3-button'>Search</router-link>
    <div to='/settings' class='w3-dropdown-hover w3-right'>
      <button v-if='status === 3 || status === 2' class='w3-button w3-border-top w3-border-green'>{{ shortenedDisplayName }} <i class='w3-text-green fa fa-check-circle'></i> <i class='fa fa-chevron-down'></i></button>
      <button v-else class='w3-button w3-border-top w3-border-red'>{{ shortenedDisplayName }} <i class='w3-text-red fa fa-exclamation-triangle'></i> <i class='fa fa-chevron-down'></i></button>
      <div class='w3-dropdown-content w3-bar-block w3-border' style='right:0'>
        <router-link v-if='status === 3' to='/settings' class='w3-bar-item w3-button'><i class='fa fa-edit'></i> Edit Name</router-link>
        <router-link v-else to='' disabled class='w3-bar-item w3-button'><i class='fa fa-edit'></i> Edit Name</router-link>
        <router-link v-if='status === 3 || status === 2' to='/profile' class='w3-bar-item w3-button'><i class='fa fa-male'></i> View Profile</router-link>
        <router-link v-else to='/profile' class='w3-bar-item w3-button w3-red'><i class='fa fa-male'></i> View Profile</router-link>
      </div>
    </div>
  </nav>
</div>
</div>
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
};
</script>

<style scoped>
    .item-right {
        float: right;
    }
</style>
