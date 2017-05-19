import Vue from 'vue'
import Router from 'vue-router'
import Home from '../page/home.vue'
import MyShop from '../page/my-shop.vue'
import Location from '../page/Location.vue'
import NoLogin from '../components/no-login.vue'
import EditStore from '../page/editStore.vue'
import Brand from '../page/brand.vue'
import LicenseList from '../page/license-list.vue'
import LicenseType from '../page/license-type.vue'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/MyShop',
      name: 'MyShop',
      component: MyShop
    },
    {
      path: '/Location',
      name: 'Location',
      component: Location
    },
    {
      path: '/NoLogin',
      name: 'NoLogin',
      component: NoLogin
    },
    {
      path: '/EditStore',
      name: 'EditStore',
      component: EditStore
    },
    {
      path: '/Brand',
      name: 'Brand',
      component: Brand
    },
    {
      path: '/LicenseList',
      name: 'LicenseList',
      component: LicenseList
    },
    {
      path: '/LicenseType',
      name: 'LicenseType',
      component: LicenseType
    }
  ]
})
