<template>
   <div class="cells" @click="showPull">
    <label class="cell-title">商铺类型</label>
    <span class="cell-input">{{ShopData.shoptype}}</span>
    <span class="cell-arrow"></span>
  </div>
</template>

<script>
import XHR from '../api'
export default {
  data () {
    return {
    }
  },
  computed: {
    ShopData () { return this.$store.state.ShopData }
  },
  created () {
    console.log(this.showBrand)
  },
  methods: {
    showPull () {
      let _this = this
      XHR.getShopTypes().then(function (res) {
        _this.$store.dispatch('Pull', res.data)
        _this.$store.dispatch('showpull', true)
      })
    }
  }
}
</script>

<style scoped>
</style>
