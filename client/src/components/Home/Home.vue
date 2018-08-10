<template>
  <div>
  <div class="w3-display-middle w3-text-white w3-center" style="width:40rem;">
    <h1><b>E X P A N D</b></h1>
    <p>Join the largest community of <em>free</em> and anonymous journalists.</p>
    <router-link to='/editor'><button href="/editor" class="w3-button w3-green w3-border w3-border-green">New post</button></router-link>
    <button class="w3-button w3-border">Learn more</button>
  </div>

</div>
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
