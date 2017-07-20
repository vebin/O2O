<template>
  <div class="service-footer">
    <div class="footer-content" @click="showSelect">
        最多{{brand.maxNum}}个，已选 <var class="select-num">{{brand.selectNum}}</var>个
    </div>
    <span class="ok" @click="ok">确定</span>
  </div>
</template>

<script>
import storage from '../../store/storage.js'
export default {
  computed: {
    shopdata () { return this.$store.state.ShopData },
    brand () { return this.$store.state.brand }  // 用户获取的品牌内容
  },
  created () {
  },
  data () {
    return {
      brands: '',
      selectText: ''
    }
  },
  methods: {
    showSelect () {
      this.$store.dispatch('setBrand', {'showSelect': true})
    },
    ok () {
      if (this.brand.selectdBrand.length > 0) {
        this.brands = this.brand.selectdBrand.join(',') // id
        this.selectText = this.brand.selectTexts.join(',')  // text
        this.$store.dispatch('myshopdata', {'brands': `${this.brands}`})
        storage.set('brand', this.brands)
        storage.set('selectText', this.selectText)
        this.setdata({'brands':`${this.brands}`})
        this.back()
      } else {
        alert('请选择品牌在进行提交')
      }
    }
  }
}
</script>

<style scoped lang="css">
  .service-footer {
    height: 45px;
    border-top:1px solid #B2B2B2;
    background: rgba(248,248,248,0.95);
    box-shadow: 0 0 0 0 #B2B2B2;
    display: flex;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 6
  }
  .footer-content:before{
    content: '\e69e';
    font-family: 'shoper';
    transform: rotate(-90deg);
    font-size: 16px;
    color: #09BB07;
    margin-right: 15px;
  }
  .footer-content{
    flex: 1;
    padding-left: 15px;
    align-items: center;
    display: flex;
  }
  .select-num{
    color: #09BB07;
  }
  .ok{
    background: #09BB07;
    width: 100px;
    height: 45px;
    text-align: center;
    font-size: 16px;
    line-height: 45px;
    color: #fff;
  }
</style>
