<template>
<div>
  <div class="footer">
    <div class="info" @click="tel" v-if="shopinfo.linkcall">
      <span class="person-name" v-if="shopinfo.linkman">{{shopinfo.linkman}}</span>
      <span :class="(shopinfo.linkcall && !shopinfo.linkman) ? 'only-one' : 'person-phone'" v-if="shopinfo.linkcall">{{shopinfo.linkcall}}</span>
    </div>
    <a :href="`#/Comment/${shopinfo.id}`" :class="[!shopinfo.linkcall ? 'onliy-commit' : 'to-commit']" @click.prevent="toComment">写评价</a>
    <div :class="['share',!shopinfo.linkcall ? 'onliy-share' : '']" @click="shareThis" v-if="shareShow">分享</div>
  </div>
  <!-- <div class="footer">
    <div class="info" @click="tel" v-if="shopinfo.linkcall">
      <span class="person-name" v-if="shopinfo.linkman">{{shopinfo.linkman}}</span>
      <span :class="(shopinfo.linkcall && !shopinfo.linkman) ? 'only-one' : 'person-phone'" v-if="shopinfo.linkcall">{{shopinfo.linkcall}}</span>
    </div>
    <div :class="['share',!shopinfo.linkcall ? 'onliy-share' : '']" @click="shareThis" v-if="shareShow">分享</div>
  </div> -->
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
      this.setUserInfo()
      this.shareShow = true
    }else{
      if (document.cookie.match(/AbcfN_ajaxuid=([^;$]+)/)) {
        this.ShopData.bbsid = document.cookie.match(/AbcfN_ajaxuid=([^;$]+)/)[1]
      }
    }
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
    toComment () {
      if (this.ShopData.bbsid === '' || this.ShopData.bbsid === '0') {
        if (this.setApp()==='other') {
          window.truckhomeAccountBinding.show()
        } else {
          this.callNativeMethod("onLogin",{})
        }
      } else{
        console.log(this.$el.querySelector('a').href)
        window.location.href = this.$el.querySelector('a').href
      }
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
    background: #fff;
    color: #FF6600;
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
    letter-spacing: 0;
    line-height: 18px;
    display: block;
    height: 18px;
    color: #333;
  }
  .person-phone{
    font-size: 16px;
    color: #333;
    line-height: 24px;
    display: block;
  }
  .only-one{
    font-size: 16px;
    color: #333;
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
  .to-commit,.onliy-commit{
    width: 110px;
    height: 50px;
    background: #FF6600;
    font-size: 18px;
    color: #fff;
    line-height: 50px;
    text-align: center;
  }
  .onliy-commit{
    flex: 1;
  }
</style>
