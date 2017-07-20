<template>
   <div class="cells">
    <label class="cell-title">商铺名称</label>
    <input class="cell-input" type="text" placeholder="请输入商铺名称" maxlength="10" @input="setShopName" :value="shopdata.name" />
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  computed: {
    page () { return this.$store.state.page },
    shopdata () { return this.$store.state.ShopData }
  },
  methods: {
    setShopName (e) {
      this.$store.dispatch('myshopdata', {'name': `${e.target.value}`})
    }
  }
}
</script>

<style scoped>
</style>
