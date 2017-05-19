import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    count: 0,
    showBrand: false,     // 是否显示服务品牌
    showShopType: false,  // 是否显示商铺类型
    pull: [],       // 商铺类型数据和扩展数据
    page: {
      edit: false,
      status: '',
      name: '',
      phone: '',
      address: '',
      location: ''
    },
    ShopData: {
      shoptype: '请选择商铺类型'
    } // 我填写的商铺数据
  },
  mutations: {
    increment (state, json) {
      state.count++
    },
    SetshowBrand (state, string) {
      state.showBrand = string
    },
    setEdit (state, json) {
      state.page.edit = json.edit
      state.page.status = json.status
      state.page.name = json.name
      state.page.phone = json.phone
      state.page.address = json.address
      state.page.location = json.location
    },
    showpull (state, t) {
      state.showShopType = t
    },
    Pull (state, t) {
      state.pull = t
    },
    myshopdata (state, name) {
      for (var i in name) {
        state.ShopData[i] = name[i]
      }
    }
  },
  actions: {
    increment (context, json) {
      context.commit('increment', json)
    },
    SetshowBrand (context, string) {
      context.commit('SetshowBrand', string)
    },
    setEdit (context, json) {
      context.commit('setEdit', json)
    },
    showpull (context, t) {
      context.commit('showpull', t)
    },
    Pull (context, t) {
      context.commit('Pull', t)
    },
    myshopdata (context, name) {
      context.commit('myshopdata', name)
    }
  }
})

export default store
