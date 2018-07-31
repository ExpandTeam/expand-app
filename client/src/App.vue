<template>
  <div id="app">
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
