<template>
   <div class="cells">
    <label class="cell-title">商铺名称</label>
    <input class="cell-input" type="text" placeholder="请输入商铺名称" maxlength="20" @input="setShopName" :value="name" />
  </div>
</template>

<script>
import storage from '../../store/storage.js'
export default {
  data () {
    return {
      name:''
    }
  },
  created () {
    let joinInfo = storage.get('data')
    if (joinInfo) {
      this.name = JSON.parse(joinInfo).name
    }
  },
  computed: {
    page () { return this.$store.state.page },
    shopdata () { return this.$store.state.ShopData }
  },
  methods: {
    setShopName (e) {
      this.setdata({'name':e.target.value})
      if (this.page.source === '添加') {
        this.submitStatus()
      } else if(this.page.source === '编辑') {
        this.checkEdit()
      }
    }
  }
}
</script>

<style scoped>
</style>
