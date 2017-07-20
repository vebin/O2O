<template>
<transition name="fade">
  <div class="select-brand" v-if="brand.showSelect" @click="hideSelect">
    <div class="centent">
      <header class="title">
          已选品牌
        <span class="chear-all" @click.stop="clear">清空</span>
      </header>
      <ul class="brand-tab">
        <li v-for="(item, index) in brand.selectTexts">{{item}}<span class="delete" @click.stop="deletes(index)">&#xe6fc;</span></li>
      </ul>
    </div>
  </div>
</transition>
</template>

<script>
export default {
  computed: {
    shopdata () { return this.$store.state.ShopData },
    brand () { return this.$store.state.brand }  // 用户获取的品牌内容
  },
  data () {
    return {
    }
  },
  methods: {
    hideSelect () {
      this.$store.dispatch('setBrand', {'showSelect': false})
    },
    clear () {
      this.hideSelect()
      let select = []
      this.$store.dispatch('setBrand', {'selectdBrand': select, 'selectNum': 0, 'selectTexts': select})
    },
    deletes (index) {
      this.brand.selectdBrand.splice(index, 1)
      this.brand.selectTexts.splice(index, 1)
      --this.brand.selectNum
    }
  }
}
</script>

<style scoped>
  .select-brand{
    position: fixed;
    left: 0;
    top:0;
    bottom: 44px;
    backface-visibility: hidden;
    z-index: 5000;
    width: 100%;
    background: rgba(0,0,0,0.20);
    box-sizing: border-box;
  }
  .fade-enter-active, .fade-leave-active {
    transition: transform .3s;
     transform: translate(0, 0);
  }
  .fade-enter, .fade-leave-active {
    transform: translate(0, 100%);
    transition: transform .3s;
  }
  .centent{
    position: absolute;
    bottom: 0;left: 0;right: 0;
    padding-left: 15px;
    background: rgba(255,255,255,0.95);
  }
  .select-brand .title{
    height: 44px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 16px;
    position: relative;
    padding-right: 15px;
  }
  .select-brand .title:after{
    content: " ";
    position: absolute;
    left: 0;
    bottom: -1px;
    width: 100%;
    height: 1px;
    border-top: 1px solid #D9D9D9;
    color: #D9D9D9;
    -webkit-transform-origin: 0 0;
    transform-origin: 0 0;
    -webkit-transform: scaleY(0.5);
    transform: scaleY(0.5);
  }
  .chear-all{
    font-size: 12px;
    color: #999;
  }
  .chear-all:before{
    content:'\e6ff';
    font-family: "shoper";
    margin-right: 5px;
  }
  .brand-tab{
    padding: 15px;
    padding-left: 0;
    overflow: hidden;
  }
  .brand-tab >li{
    height: 18px;
    padding: 0 24px 0 4px;
    font-size: 12px;
    color: #2196F3;
    border:1px solid #2196F3;
    float: left;
    border-radius: 2px;
    overflow: hidden;
    position: relative;
    margin-right: 15px;
    margin-bottom: 15px;
  }
  .brand-tab >li .delete{
    width: 20px;
    height: 20px;
    background: #2196F3;
    color: #fff;
    font-family: 'shoper';
    display: inline-block;
    position: absolute;
    right: 0;
    top:0;
    font-size: 12px;
    text-align: center;
    line-height: 20px;
  }
</style>
