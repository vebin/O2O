import Vue from 'vue'
import Router from 'vue-router'
import Home from '../page/home.vue'
import Join from '../page/join.vue'
import MyShop from '../page/my-shop.vue'
import Location from '../page/Location.vue'
import EditStore from '../page/editStore.vue'
import Brand from '../page/brand.vue'
import LicenseList from '../page/license-list.vue'
import LicenseDetail from '../page/license-detail.vue'
import SetCity from '../page/set-city.vue'
import BusinessLicense from '../page/businessLicense'
import AddLicenseInfo from '../page/addLicenseInfo'
import MyShopEdit from '../page/my-shop-edit.vue'
import MyShopStatus from '../page/my-shop-status.vue'
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
      path: '/Join',
      name: 'Join',
      component: Join
    },
    {
      path: '/MyShop/:id/:status',
      name: 'MyShop',
      component: MyShop
    },
    {
      path: '/Location',
      name: 'Location',
      component: Location
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
      path: '/LicenseList/:shopid',
      name: 'LicenseList',
      component: LicenseList
    },
    {
      path: '/LicenseDetail/:shopid/:infoId',
      name: 'LicenseDetail',
      component: LicenseDetail
    },
    {
      path: '/SetCity',
      name: 'SetCity',
      component: SetCity
    },
    {
      path: '/BusinessLicense/:shopid',
      name: 'BusinessLicense',
      component: BusinessLicense
    },
    {
      path: '/AddLicenseInfo/:source',
      name: 'AddLicenseInfo',
      component: AddLicenseInfo
    },
    {
      path: '/MyShopEdit/:status',
      name: 'MyShopEdit',
      component: MyShopEdit
    },
    {
      path: '/MyShopStatus/:shopid',
      name: 'MyShopStatus',
      component: MyShopStatus
    },
    {
      path: '/LocationLook/:lng/:lat',
      name: 'LocationLook',
      component: LocationLook
    }
  ]
})
