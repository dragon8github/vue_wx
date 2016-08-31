<template>
  <div id="app">
   <searchbar></searchbar>
  </div>
  <div class="mui-content">
    <searchresult></searchresult>
  </div>
</template>

<script>
  import searchbar from './components/SearchBar'
  import searchresult from './components/SearchResult'
  import store from './../vuex/vuex.js'

  export default {
    components: {
      searchbar,
      searchresult
    },
    store
  }
</script>