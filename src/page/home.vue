<template>
<div>
  <home-header :imgStatus="imgStatus"></home-header>
  <set-shop-name></set-shop-name>
  <set-shop-type></set-shop-type>
  <set-brand v-if="showBrand"></set-brand>
  <set-shop-address></set-shop-address>
  <set-address></set-address>
  <set-license :imgStatus="imgStatus"></set-license>
  <set-people-name></set-people-name>
  <set-phone></set-phone>
  <get-code></get-code>
  <div class="submit disabled"><span>提交</span></div>
  <alert v-if="showAlert"></alert>
  <pull></pull>
</div>
</template>

<script>
// import XHR from '../api'
import HomeHeader from '../components/home-header.vue'
import SetShopName from '../components/set-shop-name.vue'
import SetShopType from '../components/set-shop-type.vue'
import SetBrand from '../components/set-brand.vue'
import SetShopAddress from '../components/set-shop-address.vue'
import SetAddress from '../components/set-address.vue'
import SetLicense from '../components/set-license.vue'
import SetPeopleName from '../components/set-people-name.vue'
import SetPhone from '../components/set-phone.vue'
import GetCode from '../components/get-code.vue'
import Alert from '../components/alert.vue'
import Pull from '../components/pull.vue'
export default {
  components: {HomeHeader, SetShopName, SetShopType, SetBrand, SetShopAddress, SetAddress, SetLicense, SetPeopleName, SetPhone, GetCode, Alert, Pull},
  data () {
    return {
      msg: '',
      showAlert: false,
      shopTtpe: [],
      imgStatus: true
    }
  },
  computed: {
    showBrand () { return this.$store.state.showBrand }
  },
  created () {
    this.$store.dispatch('setEdit', {edit: false, status: '添加'})
  },
  methods: {
  }
}
</script>
  
<style scoped>
  .submit{
   padding: 30px 15px
  }
  .submit.disabled span{
    background: #09BB07;
    opacity: 0.4
  }
  .submit span{
    height: 45px;
    background-color: #09BB07;
    width: 100%;
    text-align: center;
    line-height: 45px;
    color: #fff;
    font-size: 16px;
    border-radius: 5px;
    display: block;
  }
</style>
