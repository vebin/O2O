import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    showAther: {
      source: 0,    // 1是扩展，0是第一层
      show: false
    },    // 是否显示其他
    showBrand: false,     // 是否显示服务品牌
    showShopType: false,  // 是否显示商铺类型
    pull: {
      Shoptype: [],      // 商铺类型数据
      showShopType: false, // 是否显示商铺类型
      showShopExtend: false, // 是否显示商铺扩展数据
      ShopExtend: []     // 商铺扩展数据
    },
    page: {           // 页面要显示的信息
      edit: false,
      source: '',
      shoptype: '',
      submitStatus: false,
      imgStatus: 1,  // 0 不做任何修改 ，1代表还没有上传,2代表已上传可以修改
      licenseImgstatus: 1, // 0 营业执照状态管理 不做任何修改 ，1代表还没有修改,2代表已上传可以修改
      shopimg: 'https://s.kcimg.cn/wap/images/detail/o2oImg/settled_photo_bg@2x.png',
      certificatesimg: 'https://s.kcimg.cn/wap/images/detail/o2oImg/settled_upload_bg@2x.png',
      driverImg: 'https://s.kcimg.cn/wap/images/detail/o2oImg/settled_photo_bg@2x.png',
      driverImgServerid: '',
      phonerError: false,
      Errormsg: '',
      imgloading: false,
      Editsubmit: true   // 我的店铺编辑页面状态
    },
    ShopData: {  // 我的商铺数据
      name: '',
      description: '',
      shoptypeid: '',
      shoptypeshow: '',
      brands: '',
      citysn: '',
      address: '',
      lng: '',
      lat: '',
      linkman: '',
      linkcall: '',
      recommendertype: 1,
      bbsid: '',
      bbsname: '',
      shopimg: '',
      certificatesimg: '',
      vcode: '',
      uploadImageSource:''
    },
    brand: {                // 服务商品牌
      allData: {},
      selectdBrand: [],   // 用来储存选中的服务商id
      maxNum: 8,
      selectNum: 0,
      search: [],
      selectTexts: [],
      showSelect: false
    },
    city: {},                // 选择城市
    driver: {
      infoId: 0,
      shopId: '',
      licenseType: '',
      carType: '',
      registerFee: '',
      registDesc: '',
      driverImg: '',
      status: false
    },
    toast: {
      toast: false,
      toastLock: true
    }
  },
  mutations: {
    SetAther (state, b) {
      state.showAther = b
    },
    SetshowBrand (state, string) {
      state.showBrand = string
    },
    setEdit (state, json) {
      for (var i in json) {
        state.page[i] = json[i]
      }
    },
    showpull (state, t) {
      state.showShopType = t
    },
    Pull (state, t) {
      for (var i in t) {
        state.pull[i] = t[i]
      }
    },
    myshopdata (state, name) {
      for (var i in name) {
        state.ShopData[i] = name[i]
      }
    },
    setBrand (state, json) {
      for (var i in json) {
        state.brand[i] = json[i]
      }
    },
    setCity (state, json) {
      for (var i in json) {
        state.city[i] = json[i]
      }
    },
    setDriver (state, json) {
      for (var i in json) {
        state.driver[i] = json[i]
      }
    },
    toggleToast (state) {
      if (state.toast.toastLock) {
        state.toast.toast = !state.toast.toast
      }
    }
  },
  actions: {
    SetAther (context, b) {
      context.commit('SetAther', b)
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
    },
    setBrand (context, json) {
      context.commit('setBrand', json)
    },
    setCity (context, json) {
      context.commit('setCity', json)
    },
    setDriver (context, json) {
      context.commit('setDriver', json)
    },
    toggleToast (context) {
      context.commit('toggleToast')
    }
  },
  getters: {
    toastState: state => {
      return state.toast.toast
    }
  }
})

export default store
