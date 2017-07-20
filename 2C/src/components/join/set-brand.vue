<template>
   <div class="cells" @click="tobrand">
    <label class="cell-title">服务品牌</label>
    <input class="cell-input" type="text" placeholder="请选择服务品牌" disabled v-if='shopdata.brands == ""' />
    <div class="cell-input" v-if='shopdata.brands != ""'>
      <!-- <span v-for="item in brand.selectTexts" v-if="brand.selectTexts.length > '0'">{{item}}</span> -->
      <span v-for="item in brand.selectTexts" class="brands">{{item}}</span>
    </div>
    <span class="cell-arrow"></span>
  </div>
</template>

<script>
import storage from '../../store/storage.js'
export default {
  data () {
    return {
      brands: [],
      text: []
    }
  },
  created () {
    if (storage.get('brand')) {
      this.brands = storage.get('brand').split(',')
      this.text = storage.get('selectText').split(',')
      this.$store.dispatch('setBrand', {'selectdBrand': this.brands, 'selectNum': this.brands.length, 'selectTexts': this.text})
      this.setdata({'brands':`${this.brands}`})
      this.$store.dispatch('myshopdata', {'brands':storage.get('brand')})
    }
  },
  computed: {
    shopdata () { return this.$store.state.ShopData },
    page () { return this.$store.state.page },
    brand () { return this.$store.state.brand }  // 用户获取的品牌内容
  },
  methods: {
    tobrand (to) {
      if (this.page.source !== '浏览') {
        this.jump('/Brand')
      }
    }
  }
}
</script>

<style scoped lang="css">
.cells{
  padding: 10px 0 0;
  align-items: flex-start
}
  .cell-input span{
    display: inline-block;
    overflow: hidden;white-space: nowrap;text-overflow: ellipsis;
    max-width: 65px;
    height: 20px;
    margin-right: 5px;
    float: left;
  }
  .cell-input .brands{
    font-size: 12px;
    color: #2196F3;
    letter-spacing: 0;
    padding: 0 4px;
    height: 18px;
    line-height: 18px;
    border: 1px solid #2196F3;
   border-radius: 2px;
   margin-bottom: 10px;
  }
</style>
