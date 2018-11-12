<template>
  <div>
    <div class="w3-container w3-light-grey" style="padding: 3rem;">
      <input class="w3-input" type='text' v-model="searchquery" v-on:keyup="search(searchquery)" placeholder="search query"/>
      <br>
      <button class="w3-button w3-green" type='button' v-on:click="search(searchquery)">Search</button>
      <button class="w3-button w3-blue w3-right" type='button' v-on:click="searchquery=' '; search(searchquery)">View All Posts</button>
        <ul class="w3-ul">
            <div class="w3-center w3-container w3-light-grey" v-if="searchquery== ''">
                <h1>There's nothing here.</h1>
                <p>Try searching something!</p>
            </div>
            <li v-if="searchquery !== ''" v-for="{owner, title, address} in results" v-bind:key="address">
                <div class="w3-container">
                    <h5>By: <small><code>{{owner}}</code></small></h5>
                    <h5><em>{{title}} {{author}}</em></h5>
                    <router-link :to="{path:'view/' + address}"> view </router-link>
                </div>
            </li>
        </ul>
        <span class="w3-right">Searches indexed by Algolia <i class="fab fa-algolia"></i></span>
    </div>
  </div>

</template>

<style>
    .element {
        padding: 10;
    }
</style>

<script>
/* eslint-disable */

export default {
    name: 'Search',
    data () {
        return {
            searchquery: "",
            results: [],
        };
    },
    methods: {
        search(query) {
            fetch(process.env.ROOT_API + '/article?search=' + query)
               .then((resp) => {
                   return resp.json();
                })
                .then((respJson) => {
                    console.log(respJson);
                this._data.results = respJson;
            })
      }
  },
}
</script>
