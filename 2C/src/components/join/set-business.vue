<template>
  <div class="cells">
   <label class="cell-title">主营业务</label>
   <input class="cell-input" type="text" placeholder="让更多的卡友找到你" maxlength="20" @input="setBusiness" :value="business" disabled />
   <span class="go-add">去添加</span>
   <span class="cell-arrow"></span>
 </div>
</template>
<script>
export default {
  data: () => ({
    business: ''
  }),
  created() {
    let joinInfo = storage.get('data')
    if (joinInfo) {
      this.name = JSON.parse(joinInfo).business
    }
  },
  computed: {
    page () { return this.$store.state.page },
    shopdata () { return this.$store.state.ShopData }
  },
  methods: {
    setBusiness (e) {
      this.setdata({'name':e.target.value})
    }
  }
}
</script>
<style scoped>
  .go-add{
    font-size: 14px;
    color: #FF6600;
    line-height: 24px;
    margin-right: 8px;
  }
</style>
