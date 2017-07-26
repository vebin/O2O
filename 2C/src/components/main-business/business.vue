<template lang="html">
  <div class="wraper">
    <div class="upload border-bottom">
      <span class="title">上传业务照片</span>
      <figure @click="chooseImage">
        <img class="bgImg" :src="bgImg">
        <img class="addImg" src="https://s.kcimg.cn/wap/images/detail/o2oImg/settled_upload@2x.png">
        <span class="uploadText">上传业务照片</span>
      </figure>
    </div>
    <div class="name border-bottom">
      <span class="title">业务名称</span>
      <div :class="name === nameInit ? 'name-init' : ''" contenteditable="true" @keyup="keyup($event)" @focus="focus($event)" @blur="blur($event)">{{name}}</div>
    </div>
    <div class="price border-bottom">
      <span class="title">业务价格</span>
      <input type="tel" placeholder="请填写此业务的价格" maxlength="6" v-model="price">
      <span class="unit" v-show="price">元</span>
    </div>
    <div :class="buttonState ? 'complete complete-active' : 'complete'" @click="submit">完成</div>
    <div class="tips">最终价格以实际为准</div>
  </div>
</template>

<script>
import XHR from '../../api/index.js'
export default {
  data () {
    return {
      lastScrollHeight: 24,
      bgImg: 'http://t2.27270.com/uploads/tu/201707/5834/5a2d0cbdf4_1.jpg',
      name: '如：钣金喷漆、补胎等',
      nameInit: '如：钣金喷漆、补胎等',
      price: '',
      lock: true,
      imgId: 1,
      nameNotInit: false,
      shopId: this.$route.params.shopid,
      toast: ''
    }
  },
  watch: {
    name (val) {
      this.nameNotInit = val === this.nameInit ? false : true
    }
  },
  computed: {
    buttonState: function () {
      return this.imgId && this.name && this.nameNotInit && this.price
    }
  },
  methods: {
    showToast (msg) {
      this.$emit('subShowToast', msg)
    },
    chooseImage () {
      wx.chooseImage({
        count: 1, // 最多可以选择的图片张数，默认9
        sizeType: ['compressed'], // original 原图，compressed 压缩图，默认二者都有
        sourceType: ['album', 'camera'], // album 从相册选图，camera 使用相机，默认二者都有
        success: res => {
          // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
          this.bgImg = res.localIds[0]
          this.uploadImg(res.localIds[0])
        },
        fail: err => {
          console.log(err)
        }
      })
    },
    uploadImg (id) {
      wx.uploadImage({
        localId: id,
        isShowProgressTips: 1,
        success: el => {
          this.imgId = el.serverId
        }
      })
    },
    checkData () {
      if (this.price === '0') {
        this.showToast('业务价格不能为0')
        return false
      }
      return true
    },
    submit () {
      if (this.buttonState && this.lock) {
        if (!this.checkData()) {
          return
        }
        this.lock = false
        XHR.addMainBusiness({
          shopId: this.shopId,
          title: this.name,
          price: this.price,
          img: this.imgId
        }).then(res => {
          let data = res.data
          if (data.status === 1) {
            this.showToast('添加成功')
            setTimeout(()=> {
              this.$router.go(-1)
            }, 3000)
          } else {
            this.showToast(data.msg)
          }
        }, err => {
          console.log(err)
          this.lock = true
        })
      }
    },
    keyup (e) {
      let [target, inner] = [e.target, e.target.innerHTML]
      if (inner.length > 20) {
        target.innerHTML = inner.substring(0, 20)
        target.blur()
        this.showToast('业务名称长度不能超过20')
      }
      this.name = target.innerHTML
    },
    focus (e) {
      let [target, inner] = [e.target, e.target.innerHTML]
      if (inner === this.nameInit) {
        target.innerHTML = ''
      }
    },
    blur (e) {
      let target = e.target
      target.innerHTML = target.innerHTML.trim()
      if (target.innerHTML === '') {
        target.innerHTML = this.name = this.nameInit
      }
    }
  }
}
</script>

<style lang="css" scoped>
  .wraper {
    padding: 10px 15px 20px;
    background: #fff;
  }
  .upload, .name, .price {
    position: relative;
  }
  .upload {
    padding-bottom: 15px;
  }
  .border-bottom::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 1px;
    transform: scaleY(0.5);
    background: #E5E5E5;
  }
  .upload .title {
    font-size: 16px;
    color: #666666;
    letter-spacing: 0;
    line-height: 24px;
    display: block;
  }
  .upload figure {
    width: 285px;
    height: 160px;
    margin: 12px auto 0;
    position: relative;
  }
  .upload figure .bgImg {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .upload figure .addImg {
    position: absolute;
    top: 53px;
    left: 50%;
    transform: translateX(-50%);
    width: 28px;
    height: 28px;
  }
  .upload figure .uploadText {
    position: absolute;
    top: 91px;
    left: 0;
    width: 100%;
    height: 28px;
    text-align: center;
    color: #fff;
  }

  .name, .price {
    min-height: 44px;
    font-size: 0;
    width: 100%;
    box-sizing: border-box;
    display: flex;
    align-items: center;
  }
  .name .title, .price .title {
    font-size: 16px;
    color: #666666;
    line-height: 24px;
    letter-spacing: 0;
    width: 64px;
    margin-right: 15px;
  }
  .name div {
    transition: height 0.5s;
    word-break: break-all;
    outline: none;
  }
  .name .name-init {
    color: #999;
  }
  .name div, .price input {
    font-size: 16px;
    line-height: 24px;
    color: #333;
    letter-spacing: 0;
    resize: none;
    margin: 10px 0;
    flex: 1;
  }
  .price .unit {
    font-size: 12px;
    color: #333;
    position: absolute;
    left: 140px;
    top: 14px;
  }
  ::-webkit-input-placeholder { /* WebKit browsers */
    color:#999;
  }
  .complete {
    border-radius: 5px;
    font-size: 16px;
    color: #FFFFFF;
    letter-spacing: 0;
    line-height: 44px;
    background: rgb(255, 194, 153);
    text-align: center;
    margin-top: 30px;
  }
  .complete-active {
    background: #FF6600;
  }
  .tips {
    margin-top: 10px;
    font-size: 12px;
    color: #999999;
    letter-spacing: 0;
    line-height: 13px;
    text-align: center;
  }
</style>
