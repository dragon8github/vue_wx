import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const STORAGE_KEY = 'collectItems'

//定义了一个 state 对象，里面的两个属性对应着收藏夹内容，搜索结果。换句话说，整个APP的数据就是存放在 state 对象里，随取随用。
const state = {
  collectItems: [],
  searchResult: {}
}

//从localStorage中获取并且初始化收藏夹
state.collectItems = localStorage.getItem(STORAGE_KEY) ? localStorage.getItem(STORAGE_KEY).split(',') : []

//用于改变 state 状态的一系列方法
const mutations = {
  //把搜索结果存入 state
  SET(state, result){
    state.searchResult = result	
  },
  //添加到收藏夹操作（包括 localstorage ）
  COLLECT(state,name){
    state.collectItems.push(name)
  },
  //从收藏夹移除操作（包括 localstorage ）
  DELETE(state,name){
   state.collectItems.splice(state.collectItems.indexOf(name),1)
   localStorage.setItem(STORAGE_KEY, state.collectItems)
  }
}

export default new Vuex.Store({
  state, mutations
})




