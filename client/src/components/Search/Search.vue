<template>
    <div>
        <form action="url" method="get">
            <input type='text' v-model="searchquery" placeholder="search query"/>
            <button type='button' v-on:click="search(searchquery)">Search</button>
        </form>

        <ul>
            <li v-for="{author, title, address} in results" v-bind:key="address">
                <div class="element">
                    <h2>Author: {{author}}</h2>
                    <h3><em>{{title}}</em></h3>
                    <button> see more </button>
                    <router-link to="{
                        path:'view'
                        query: {address: address}}"> view </router-link>
                </div>
            </li>
        </ul>
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
          var dummyData = [
              {
                  author: "Nathan",
                  title: "Expand is worth millions",
                  address: "",
              },
              {
                  author: "SomeRandomDude",
                  title: "some random title",
                  address: "",
              },
          ];
          this._data.results = dummyData; //replace this
      }
  },
}
</script>
