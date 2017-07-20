<template>
<div class="wraper">
  <div class="mask" v-if="pull.showShopExtend" @click="cancel"></div>
  <transition name="fade">
    <div class="actionsheet" v-if="pull.showShopExtend">
      <ul>
        <li class="line" >维修类（可多选）</li>
        <li v-for="(item, index) in pull.ShopExtend" class="line">
          <input type="checkbox" v-model="selected" :value="item.Typedescription" @change="onchange" />
          <span class="select">{{item.Typedescription}}</span>
        </li>
        <li class="line" @click="setAther">其他（填写）</li>
        <li class="cencel" @click="ok">确认</li>
      </ul>
    </div>
  </transition>
</div>
</template>
<script>
import storage from '../../store/storage.js'
export default {
  computed: {
    pull () { return this.$store.state.pull },
    shopdata () { return this.$store.state.ShopData }
  },
  data () {
    return {
      selected: []
    }
  },
  created () {
  },
  methods: {
    ok () {
      if (!this.selected.length) {
        alert("请选择分类")
      }else{
        this.$store.dispatch('Pull', {'showShopType': false, 'showShopExtend': false})    // 取消弹层
        var shoptypeshow = this.selected.join(',')
        this.setdata({'shoptypeshow':`维修|${shoptypeshow}`})                   // 储存并验证
        this.submitStatus()
      }
    },
    cancel(){
      this.$store.dispatch('Pull', {'showShopType': false, 'showShopExtend': false})    // 取消弹层
    },
    setAther () {
      this.$store.dispatch('Pull', {'showShopType': false, 'showShopExtend': false})
      var shoptypeshow = this.selected.join(',')
      this.$store.dispatch('myshopdata', {'shoptypeshow': `维修|${shoptypeshow}`})   // 把上次获取的进行储存
      var _this = this
      setTimeout(function () {
        _this.$store.dispatch('SetAther', {'show': true, 'source': 1})
      }, 300)
    },
    onchange () {
      var shoptypeshow = this.selected.join(',')
      this.$store.dispatch('myshopdata', {'shoptypeshow': `维修|${shoptypeshow}`})
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
  .mask{
    position: fixed;left: 0;
    right: 0;bottom: 0;top:0;
    background: rgba(0,0,0,.5);
    z-index: 10
  }
  .line,.cencel{
    height: 50px;
    border-top: 1px solid #e5e5e5;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #fff;
    position: relative;
  }
  .cencel{
    border-top:10px solid #f5f5f5;
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
