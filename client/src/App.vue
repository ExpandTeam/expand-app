<template>
  <div id="app">
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.2.0/css/all.css" integrity="sha384-hWVjflwFxL6sNzntih27bfxkr27PmbbK/iSvJ+a4+0owXq79v+lsFkW54bOGbiDQ" crossorigin="anonymous">
    <link rel="stylesheet" href="./static/w3.min.css">
    <Navigation />
    <router-view />
  </div>
</template>

<script>
import Navigation from './components/Navigation/Navigation';
export default {
    name: 'app',
    components: {
        Navigation,
    },
    beforeCreate () {
        this.$store.dispatch('registerWeb3');
    },
    computed: {
        web3 () {
            return this.$store.state.web3;
        },
    },
};
</script>

<style lang="scss">
@import 'assets/css/global.css';
</style>
