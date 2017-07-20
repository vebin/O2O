<template>
   <div class="cells" @click="showPull">
    <label class="cell-title">商铺类型</label>
    <input type="text" placeholder="请选择商铺类型" :value="page.shoptype" class="cell-input" disabled=""  />
    <span class="cell-arrow"></span>
  </div>
</template>

<script>
import XHR from '../../api'
import storage from '../../store/storage.js'
export default {
  data () {
    return {
      focus: false
    }
  },
  computed: {
    pull () { return this.$store.state.pull },
    page () { return this.$store.state.page }
  },
  created () {
    let joinInfo = storage.get('data')
    if (joinInfo) {
      this.page.shoptype = JSON.parse(joinInfo).shoptype
    }
  },
  methods: {
    showPull () {
      if (this.pull.Shoptype.length === 0) {
        let _this = this
        XHR.getShopTypes().then(function (res) {
          _this.$store.dispatch('Pull', {'showShopType': true, 'showShopExtend': false})
          _this.$store.dispatch('Pull', {'Shoptype': res.data})
        })
      } else {
        this.$store.dispatch('Pull', {'showShopType': true, 'showShopExtend': false})
      }
    }
  }
}
</script>

<style scoped>
  input{-webkit-text-fill-color:black; -webkit-opacity:1; opacity: 1;}
</style>
