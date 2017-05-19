<template>
  <div :class="[showShopType ? 'visible-toggle' : '', 'actionsheet']" >
    <ul>
      <li :class="[item.select ? 'select' : '', 'line'] " v-for="(item, index) in pull" @click="selectShops(item)">{{item.Typedescription}}</li>
      <li class="cencel" @click="cancel">取消</li>
    </ul>
  </div>
</template>

<script>
import XHR from '../api'
export default {
  props: ['shopTtpe'],
  computed: {
    showShopType () { return this.$store.state.showShopType },
    pull () { return this.$store.state.pull },
    ShopData () { return this.$store.state.ShopData }
  },
  data () {
    return {
      datas: [],
      show: false,
      height: ''
    }
  },
  created () {
  },
  methods: {
    selectShops (item) {
      var _this = this
      if (item.Typedescription === '服务站') {
        this.$store.dispatch('SetshowBrand', true)
      } else {
        this.$store.dispatch('SetshowBrand', false)
      }
      if (item.IsExtend === 1) {
        XHR.getShopExtend({shoptypeid: `${item.id}`}).then(function (res) {
          _this.cancel()
          _this.$store.dispatch('Pull', res.data)
          console.log(res.data)
          setTimeout(function () {
            _this.$store.dispatch('showpull', true)
          }, 500)
        })
      } else {
        this.$store.dispatch('myshopdata', {'shoptype': `${item.Typedescription}`, 'shoptypeid': `${item.Id}`})
        this.cancel()
        console.log(this.ShopData.shoptype)
      }
    },
    cancel () {
      this.$store.dispatch('showpull', false)
    }
  }
}
</script>

<style>
  .actionsheet.visible-toggle{
    transform: translate(0, 0);
  }
  .actionsheet{
    position: fixed;
    left: 0;
    bottom: 0;
    transform: translate(0, 100%);
    backface-visibility: hidden;
    z-index: 5000;
    width: 100%;
    max-height: 100%;
    overflow-y: auto;
    background-color: @pageDefaultBackgroundColor;
    transition: transform .3s;
  }
  .line,.cencel{height: 50px;border-top: 1px solid #e5e5e5;display: flex;justify-content: center;align-items: center;background: #fff;}
  .cencel{border-top:10px solid #f5f5f5;}
  .line.select:after{
    font-family: 'shoper';
    content: '\e703';
    margin-left: 15px;
    color: #09BB07;
  }
</style>
