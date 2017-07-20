<template>
<div :class="[!page.phonerError?'':'cellbox']">
   <div class="cells">
    <label class="cell-title">店主电话</label>
    <input class="cell-input" type="number" placeholder="请输入店主的手机号码" :value='phone' @input="oninput" />
  </div>
  <span class="text-tip" v-if="page.phonerError">{{page.Errormsg}}</span>
</div>
</template>

<script>
import XHR from '../../api'
import storage from '../../store/storage.js'
export default {
  data () {
    return {
      phone: '',
      codes: '获取验证码',
      error: '',
      time: 60,
      disabled: true
    }
  },
  computed: {
    page () { return this.$store.state.page },
    shopdata () { return this.$store.state.ShopData }
  },
  created () {
    let joinInfo = storage.get('data')
    if (joinInfo) {
      this.phone = JSON.parse(joinInfo).linkcall
    }
  },
  methods: {
    oninput (e) {
      this.phone = e.target.value
      if (e.target.value.length > 10) {
        this.phone = e.target.value.slice(0, 11)
        e.target.value = e.target.value.slice(0, 11)
        this.setdata({'linkcall':this.phone})
        if((/^1(([38]\d)|(4[57])|(5[012356789])|(7[0135678]))\d{8}$/.test(this.phone))){
          this.$store.dispatch('setEdit', {phonerError: false})
          this.submitStatus()
        } else {
          this.$store.dispatch('setEdit', {phonerError: true, Errormsg: '请填写正确手机号'})
          this.$store.dispatch('setEdit', {'submitStatus': false})
        }
      } else {
        this.setdata({'linkcall':this.phone})
      }
    }
  }
}
</script>

<style scoped>
.getCode.disabled{
  opacity: 0.4
}
.cellbox{
  height: 61px;
  position: relative;
  background: #fff;
  overflow: hidden;
}
.cellbox:after{
    position: absolute;
    left: 15px;
    bottom: 0;
    content: "";
    height: 1px;
    background: #E5E5E5;
}
.cellbox .text-tip{
  padding-left: 76px;
    font-size: 12px;
    color: #F7411C;
    line-height: 12px;
    vertical-align: top;
}
.cellbox .cells:after{
    position: absolute;
    left: 15px;
    bottom: 0;
    content: "";
    width: 0;
    height: 1px;
    background: #E5E5E5;
  }
.to-phone{
  color: #028DFE;
  font-size: 14px;
  padding-right: 15px;
}
.to-phone:before{
  content: '\e6ba';
  font-family: 'shoper';
  margin-right: 5px;
}
</style>
