<template>
<div :class="[error==''?'':'cellbox']">
   <div :class="['cells',this.$route.name === 'MyShopEdit' ? 'cells-border' : '']">
    <label class="cell-title">手机号</label>
    <input v-if="page.source =='添加'" class="cell-input" type="number" placeholder="请输入店主的手机号码"  :disabled="page.edit" :value='phone' @input="oninput" />
    <div :class="[disabled ? 'getCode disabled' : 'getCode']" v-if="page.source == '添加'" @click="getCode">{{codes}}</div>
    <span class="cell-input" v-if="page.source!='添加'">{{phone}}</span>
    <span class="to-phone" v-if="page.source == '编辑'">联系客服修改</span>
  </div>
  <span class="text-tip" v-if="error!==''">{{error}}</span>
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
    let joinInfo = JSON.parse(storage.get('data'))
    if (joinInfo) {
      this.phone = joinInfo.linkcall
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
          this.error=''
          this.disabled = false
          this.submitStatus()
        } else {
          this.disabled = true
          this.page.submitStatus = false
          this.error='请填写正确手机号'
        }
      } else {
        this.page.submitStatus = false
      }
    },
    getCode (e) {
      if (!this.disabled) {
        var _this = this
        this.disabled = true
        XHR.toCode({'tel': `${this.phone}`}).then(function (res) {
          if (res.data.errorcode === '2') {
            _this.error = '手机号错误'
            _this.page.submitStatus = false
          } else if (res.data.errorcode === '3') {
            _this.error = '已注册'
            _this.page.submitStatus = false 
          } else if (res.data.errorcode === '4') {
            _this.error = '今日短信已超出上限'
            _this.page.submitStatus = false
          } else {
              let codes = setInterval(() => {
              _this.time --
              _this.codes = '倒计时' + _this.time + '秒'
              if (_this.time === 0) {
                _this.codes = '重新获取'
                _this.time = 60
                _this.disabled = false
                clearInterval(codes)
              }
            }, 1000)
          }
        })
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
    width: 100%;
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
.cells-border:after{
  width: 0;
}
</style>
