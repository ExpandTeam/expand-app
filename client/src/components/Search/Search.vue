<template>
    <div class="w3-container w3-light-grey" style="padding: 3rem;">
        <form action="url" method="get">
            <input class="w3-input" type='text' v-model="searchquery" placeholder="search query"/>
            <br>
            <button class="w3-button w3-green" type='button' v-on:click="search(searchquery)">Search</button>
        </form>
        <ul class="w3-ul">
            <li v-for="{author, title, address} in results" v-bind:key="address">
                <div class="element">
                    <h5>Author: {{author}}</h5>
                    <h5><em>{{title}}</em></h5>
                    <router-link :to="{path:'view/' + address}"> view </router-link>
                </div>
            </li>
        </ul>
        <span class="w3-right">Searches indexed by Algolia <i class="fab fa-algolia"></i></span>
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
