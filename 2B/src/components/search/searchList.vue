<template>
  <div class="service-brand">
    <ul v-if="source === '0'">
      <li class="select" v-for="(item, index) in searchList" @click="setCity(item)">{{item.name_short}}</li>
    </ul>
    <ul v-else>
      <li class="no-select" v-for="(item, index) in searchList">
        <input type="checkbox" :value="item.F_BrandId" v-model="brand.selectdBrand" @change="onchange" />
        <span>{{item.F_BrandName}}</span>
      </li>
    </ul>
  </div>
</template>
<script>
import storage from '../../store/storage.js'
export default {
  props: ['searchList', 'source', 'selectText', 'selectedNum'],
  data () {
    return {
      hisrorySearch: []
    }
  },
  computed: {
    brand () { return this.$store.state.brand }  // 用户是否入住成功状态
  },
  created () {
    if (localStorage.getItem('historySearch')) {
      this.hisrorySearch = localStorage.getItem('historySearch').split('|')
    }
  },
  methods: {
    setCity (item) {
      if (this.$route.params.source === '0') {
        let history = this.hisrorySearch.join(',')
        let json = {'citysn': `${item.sn}`, 'address': `${item.name_short}`}
        storage.set('searchCity', json)                                // 记录当前搜索
        if (this.hisrorySearch.length === 3) {                         // 记录历史搜索
          if (history.indexOf(item.name_short)==-1){
            this.hisrorySearch.splice(0, 1)
            this.hisrorySearch.push(JSON.stringify(json))
            localStorage.setItem('historySearch', this.hisrorySearch.join('|'))
          }
        } else {
          if (history.indexOf(item.name_short)==-1){
            this.hisrorySearch.push(JSON.stringify(json))
            localStorage.setItem('historySearch', this.hisrorySearch.join('|'))
          }
        }
        localStorage.setItem('searchsource', '1')
        this.back()
      } else {
        this.setdata({'citysn':item.sn,'citytext':item.name_short})
        this.back()
      }
    },
    onchange (e) {
      // 判断选中
      if (e.target.checked) {
        if (this.selectedNum === this.brand.maxNum) {
          this.brand.selectdBrand.splice(7, 1)
          this.selectText.splice(7, 1)
          this.selectText.push(e.target.nextElementSibling.innerText)
        } else {
          this.selectText.push(e.target.nextElementSibling.innerText)
        }
      } else {
        for (var i = 0; i < this.selectText.length; i++) {
          if (this.selectText[i] === e.target.nextSibling.nextSibling.textContent) {
            this.selectText.splice(i, 1)
          }
        }
      }
      // 进行赋值
      this.$store.dispatch('setBrand', {'selectdBrand': this.brand.selectdBrand, 'selectNum': this.brand.selectdBrand.length, 'selectTexts': this.selectText})
    }
  }
}
</script>
<style scoped>
  .service-brand{
    height: 100%;overflow-y: scroll;box-sizing: border-box;position: fixed;width: 100%;top:0px;z-index: 5;
    padding-top: 60px;box-sizing: border-box;
    background: #fff;
  }
  .service-brand > ul{
    padding-left: 15px;
    background: #fff;
  }
  .service-brand li{
    height: 44px;
    font-size: 16px;
    display: flex;
    align-items: center;
    position: relative;
  }
  .service-brand li input{
    position: absolute;
    left: 0;
    top:0;
    width: 100%;
    height: 100%;
    z-index: 2;
    opacity: 0;
  }
  .service-brand li:after{
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
  .service-brand .no-select span{
    position: absolute;
    width: 100%;height: 100%;
    left: 0;
    top: 0;
    align-items: center;
    display: flex;
  }
  .service-brand .no-select span:before{
    width: 17px;
    height: 17px;
    border:1px solid #eee;
    border-radius: 50%;
    margin-right: 15px;
    content: '';
    display: inline-block;
  }
  .service-brand input:checked+span{
    color: #09BB07;
  }
  .service-brand input:disabled+span{
    color: #999
  }
  .service-brand input:checked+span:before{
    content:'\597d';
    font-family: 'shoper';
    display: inline-block;
    font-size: 18px;
    color: #09BB07;
    border-radius: 50%;
    margin-right: 15px;
    line-height: 18px;
  }
</style>
