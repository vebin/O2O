import Vue from 'vue'
import Router from 'vue-router'
import Home from '../page/home.vue'
import ToHome from '../page/to-home.vue'
import User from '../page/user.vue'
import Join from '../page/join.vue'
import SetCity from '../page/set-city.vue'
import Brand from '../page/brand.vue'
import Location from '../page/Location.vue'
import ShopDetail from '../page/shop-detail.vue'
import LicenseDetail from '../page/license-detail.vue'
import ShopTypeDetail from '../page/shop-type-detail.vue'
import SearchShop from '../page/search-shop.vue'
import LocationLook from '../page/location-look.vue'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/Home',
      name: 'ToHome',
      component: ToHome
    },
    {
      path: '/User',
      name: 'User',
      component: User
    },
    {
      path: '/Join',
      name: 'Join',
      component: Join
    },
    {
      path: '/SetCity/:source',
      name: 'SetCity',
      component: SetCity
    },
    {
      path: '/Brand',
      name: 'Brand',
      component: Brand
    },
    {
      path: '/Location',
      name: 'Location',
      component: Location
    },
    {
      path: '/ShopDetail/:shopid/:type',
      name: 'ShopDetail',
      component: ShopDetail
    },
    {
      path: '/LicenseDetail/:shopid/:infoId',
      name: 'LicenseDetail',
      component: LicenseDetail
    },
    {
      path: '/ShopTypeDetail/:typeid/:text',
      name: 'ShopTypeDetail',
      component: ShopTypeDetail
    },
    {
      path: '/SearchShop',
      name: 'SearchShop',
      component: SearchShop
    },
    {
      path: '/LocationLook/:lng/:lat',
      name: 'LocationLook',
      component: LocationLook
    }
  ]
})

