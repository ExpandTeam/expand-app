<template>
  <div class="w3-container w3-black w3-display-middle" style="box-shadow:0 10px 16px 0 rgba(0,0,0,0.2),0 6px 20px 0 rgba(0,0,0,0.19); ">
    <h1 class="w3-blue w3-center" style="padding: 5px;"><b>e x p a n d</b></h1>
    <p class="w3-center">The most powerful website for posting articles.</p>
    <em>Expand yourself.</em>
    <br>
    <br>
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
