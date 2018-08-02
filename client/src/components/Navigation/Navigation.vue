<template>
<div>
  <nav>
    <router-link to="/">Home</router-link>
    <router-link to="/about">About</router-link>
    <router-link to="/settings" v-if="web3.isInjected" class="item-right">{{ user.displayName }}</router-link>
    <a v-else class="item-right">Not authenticated</a>
  </nav>
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
    },
};
</script>

<style scoped>
    .item-right {
        float: right;
    }
</style>
