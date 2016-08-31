<template>
  <header id='search-bar' class='mui-bar mui-bar-nav'>
    <div class='show-collection-switch' @click='showCollection'>
      <span class='mui-icon mui-icon-bars'></span>
    </div>
    <input type="search" class='mui-input-clear mui-input-speech' v-model='keyword' @keyup.enter='setKeyword(0)'>
    <div class='search-switch' @click='setKeyword(0)'>
      <span class='mui-icon mui-icon-search'></span>
    </div>
  </header>
  <ul class='collection-box' v-show='collectionSwich' transition='show'>
    <li class='coll-name' v-for='item in collectItem' @click='oprateItem(item)'>
      <span>{{item}}</span>
      <span class='mui-badge mui-badge-danger' v-show='editSwitch'>✘</span>
    </li> 
    <li class='coll-name edit-switch' @click='showEdit'>编辑</li>
    <li class='clear'></li>
  </ul>
</template>
<script>

export default {
  data() {
    return {
      keyword: '',
      collectionSwich: 0,
      editSwitch: 0
    }
  },
  methods: {
    showCollection () {
      let switchFun = (obj, key) => {
        key === 1 ? $('.show-collection-switch').css({transform : 'rotate(90deg)'}) : $('.show-collection-switch').css({transform : 'rotate(360deg)'})
        obj.collectionSwich = key
      }
      this.collectionSwich === 0 ? switchFun(this, 1) : switchFun(this, 0)
    },
    showEdit () {
      this.editSwitch === 0 ? this.editSwitch = 1 : this.editSwitch = 0
    },
    oprateItem (name) {
      if (this.editSwitch === 0) {
        this.setKeyword (name)
        document.querySelector('.show-collection-switch').click()
      } else if (this.editSwitch === 1) {
        this.deleteCollection(name)
      }
    },
    setKeyword (key) {
      if (key === 0) {
        this.searchFun(this.keyword) //由于有v-model，所以这时的this.keyword不是''，而是value
      } else {
        this.searchFun(key)
      }
    }
  },
  vuex: {
    getters: {
      collectItem (state) {
        return state.collectItems
      }
    },
    actions: {
      deleteCollection: ({ dispatch }, name) => {
        dispatch('DELETE', name)
      },
      searchFun: ({ dispatch }, keyword) => {
        console.log(keyword)
        $.get('http://localhost:8090', {query: keyword}, (data) => {
          console.log(data)
          dispatch('SET', JSON.parse(data))
        })
      }
    }
  }
}
</script>
<style scoped>
  #search-bar {
    display: flex;
    justify-content: space-around;
    align-items: center;
    background: #fff;
    z-index: 100;
  }
  #search-bar .show-collection-switch {
    transition: all 400ms;
    cursor: pointer;
  }
  #search-bar .search-switch {
    cursor: pointer;
  }
  #search-bar input {
    margin-left: 10px;
    margin-right: 10px;
    text-align: left;
  }
  .show-transition {
    position: fixed;
    top: 44px;
    list-style: none;
    margin: 0;
    padding: 10px 0 0 10px;
    width: 100%;
    background: #fff;
    border-bottom: 1px solid #ddd;
    z-index: 100;
    transition: all 300ms;
  }
  .show-enter, .show-leave {
    top: 0;
    opacity: 0;
  }
  .collection-box .coll-name {
    float: left;
    margin-right: 10px;
    margin-bottom: 10px;
    padding: 5px 10px;
    border: 1px solid #ddd;
    border-radius: 5px;
    font-size: 13px;
    cursor: pointer;
  }
  .collection-box .clear {
    clear: both;
  }
  .collection-box .edit-switch {
    float: left;
    background: #eee;
  }
</style>