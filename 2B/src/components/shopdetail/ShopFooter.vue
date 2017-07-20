<template>
<div>
  <div class="footer">
    <div class="info" @click="tel" v-if="shopinfo.linkcall">
      <span class="person-name" v-if="shopinfo.linkman">{{shopinfo.linkman}}</span>
      <span :class="(shopinfo.linkcall && !shopinfo.linkman) ? 'only-one' : 'person-phone'" v-if="shopinfo.linkcall">{{shopinfo.linkcall}}</span>
    </div>
    <div :class="['share',!shopinfo.linkcall ? 'onliy-share' : '']" @click="shareThis" v-if="shareShow">分享</div>
  </div>
</div>
</template>
<script>
export default {
  props: ['shopinfo','photo'],
  data () {
    return {
      shareShow: false
    }
  },
  created () {
    this.getWxconfig()
    if (this.setApp()!=='other') {
      this.shareShow = true
    }
    // let _this = this
    // setTimeout(function(){
    //   _this.share()
    // }, 100)
  },
  mounted () {
    this.share()
  },
  methods: {
    tel () {
      window.location.href = 'tel://' + this.shopinfo.linkcall
      ga('send', 'event', "拨打附近商家电话", this.shopinfo.typeshow,'')
    },
    shareThis () {
      this.callNativeMethod("onShare",{
        title: this.shopinfo.name, // 分享标题
        desc: this.shopinfo.address, // 分享描述
        link: window.location.href, // 分享链接
        imgUrl: this.photo, // 分享图标
        isAddCalorie: false //分享成功后是否加卡路里，true加，false不加
      })
    },
    share () {
      let _this = this
      wx.ready(function () {
        wx.showAllNonBaseMenuItem();
        wx.hideMenuItems({
            menuList: ["menuItem:editTag","menuItem:delete","menuItem:copyUrl","menuItem:share:qq","menuItem:share:QZone","menuItem:openWithQQBrowser","menuItem:openWithSafari","menuItem:share:email","menuItem:share:weiboApp"] // 要隐藏的菜单项，只能隐藏“传播类”和“保护类”按钮，所有menu项见附录3
        })
        // 分享到朋友圈
        wx.onMenuShareTimeline({
            title: _this.shopinfo.name,
            link: window.location.href,
            imgUrl: _this.photo,
            success: function () {
              console.log(_this.shopinfo)
            },
            cancel: function () {
                // 用户取消分享后执行的回调函数
            }
        })
        //分享给朋友
        wx.onMenuShareAppMessage({
            title: _this.shopinfo.name,
            desc: _this.shopinfo.address,
            link: window.location.href,
            imgUrl: _this.photo,
            success: function () {
            },
            cancel: function () {
                // 用户取消分享后执行的回调函数
            }
        })
      })
    }
  }
}
</script>
<style scoped>
  .footer{
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    color: #fff;
    justify-content: center;
  }
  .info{
    position: relative;
    flex: 1;
    height: 50px;
    padding-left: 54px;
    background: #09BB07;
    white-space: nowrap;
    text-overflow:ellipsis;
    overflow: hidden;
  }
  .info:before{
    position: absolute;
    font-family: 'shoper';
    left: 15px;
    top: 7px;
    content: "\e6ba";
    font-size: 24px;
  }
  .person-name{
    margin-top: 4px;
    font-size: 12px;
    color: #FFFFFF;
    letter-spacing: 0;
    line-height: 18px;
    display: block;
    height: 18px;
  }
  .person-phone{
    font-size: 16px;
    color: #FFFFFF;
    line-height: 24px;
    display: block;
  }
  .only-one{
    font-size: 16px;
    color: #FFFFFF;
    line-height: 50px;
    display: block;
  }
  .share{
    position: relative;
    width: 48px;
    height: 50px;
    line-height: 50px;
    font-size: 14px;
    color: #fff;
    background: #0AAA08;
    padding-left: 42px;
  }
  .share:before{
    position: absolute;
    font-family: 'shoper';
    content: "\e6bb";
    left: 20px;
    top: 0;
  }
  .onliy-share{
    width: 100%;
    text-align: center;
    padding-right: 42px;
  }
  .onliy-share:before{
    left: 0;
    right: 50px;
  }
</style>
