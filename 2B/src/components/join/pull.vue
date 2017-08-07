<template>
<div class="wraper">
  <div class="mask" v-if="pull.showShopType" @click="cancel"></div>
  <transition name="fade">
    <div class="actionsheet" v-if="pull.showShopType">
      <ul>
        <li class="line" v-for="(item, index) in pull.Shoptype" >
          <input type="radio" v-model="selected" :value="item.Typedescription" @change="onchange" name="radio" :data-id="item.Id"/>
          <span class="select">{{item.Typedescription}}</span>
        </li>
        <li class="line">
            <input type="radio" v-model="selected" value="其他" @change="setAther" name="radio" />
            <span class="select">其他（填写）</span>
        </li>
        <li class="cencel" @click="cancel">取消</li>
      </ul>
    </div>
  </transition>
</div>
</template>
<script>
import XHR from '../../api'
import storage from '../../store/storage.js'
export default {
  computed: {
    pull () { return this.$store.state.pull },
    shopdata () { return this.$store.state.ShopData }
  },
  data () {
    return {
      selected: ''
    }
  },
  created () {
    let joinInfo = storage.get('recommend')
    if (joinInfo) {
      this.selected = JSON.parse(joinInfo).shoptype
    }
  },
  methods: {
    showExtend (id) {
      var _this = this
      if (this.pull.ShopExtend.length === 0) {
        XHR.getShopExtend({shoptypeid: `${id}`}).then(function (res) {
          _this.$store.dispatch('Pull', {'showShopType': false, 'showShopExtend': true, 'ShopExtend': res.data})
        })
      } else {
        _this.$store.dispatch('Pull', {'showShopType': false, 'showShopExtend': true})
      }
    },
    cancel () {
      this.$store.dispatch('Pull', {'showShopType': false, 'showShopExtend': false})
    },
    setAther () {
      this.cancel()
      var _this = this
      this.$store.dispatch('setEdit', {'shoptype': `其他`})
      this.setdata({'shoptypeid':`0`,'shoptypeshow':`其他`,'shoptype':`其他`})
      setTimeout(function () {
        _this.$store.dispatch('SetAther', {'show': true, 'source': 0})
      }, 300)
    },
    onchange (e) {
      if (this.selected === '服务站') {
        this.$store.dispatch('SetshowBrand', true)
      } else {
        this.$store.dispatch('SetshowBrand', false)
      }
      if (this.selected === '维修') {
        this.showExtend(`${e.target.dataset['id']}`)      // 显示二级扩展
        this.setdata({'shoptypeid':e.target.dataset['id'],'shoptype':this.selected})
        this.$store.dispatch('setEdit', {'shoptype': `${this.selected}`})
      } else {
        this.setdata({'shoptypeid':e.target.dataset['id'],'shoptypeshow':this.selected,'shoptype':this.selected})
        this.cancel()
        this.$store.dispatch('setEdit', {'shoptype': `${this.selected}`})
      }
      this.submitStatus()
    }
  }
}
</script>

<style scoped>
  .fade-enter-active, .fade-leave-active {
    transition: transform .3s;
     transform: translate(0, 0);
  }
  .fade-enter, .fade-leave-active {
    transform: translate(0, 100%);
    transition: transform .3s;
  }
  .actionsheet{
    position: fixed;
    left: 0;
    bottom: 0;
    backface-visibility: hidden;
    z-index: 5000;
    width: 100%;
    max-height: 100%;
    overflow-y: auto;
  }
  .line,.cencel{height: 50px;border-top: 1px solid #e5e5e5;display: flex;justify-content: center;align-items: center;background: #fff;position: relative;}
  .cencel{border-top:10px solid #f5f5f5;}
  .mask{
    position: fixed;left: 0;
    right: 0;bottom: 0;top:0;
    background: rgba(0,0,0,.5);
    z-index: 10
  }
  .line.ok:after{
    font-family: 'shoper';
    content: '\e703';
    margin-left: 15px;
    color: #09BB07;
  }
  .line input{
    position: absolute;
    left: 0;top: 0;
    width: 100%;
    height: 100%;
    z-index: 2;
    opacity: 0;
  }
  .line input:checked+span{
    position: absolute;
    left: 0;top: 0;
    width: 100%;
    height: 100%;
    text-align: center;
    line-height: 50px;
  }
  .line input:checked+span:after{
    font-family: 'shoper';
    content: '\e703';
    margin-left: 15px;
    color: #09BB07;
  }
</style>
