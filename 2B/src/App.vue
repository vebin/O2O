<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
  created () {
    // this.getWxconfig()
  },
  data () {
    return {
      watchSource:'',
      watchto:''
    }
  },
  watch:{
    '$route' (to, from) {
      this.watchSource = from.path
      this.watchto = to
    }
  },
  methods: {
  }
}
</script>

<style>
@import "./common/reset.css" ;
@font-face {
  font-family: 'shoper';  /* project id 202331 */
  src: url('//at.alicdn.com/t/font_uar2ctthurcc8fr.eot');
  src: url('//at.alicdn.com/t/font_uar2ctthurcc8fr.eot?#iefix') format('embedded-opentype'),
  url('//at.alicdn.com/t/font_uar2ctthurcc8fr.woff') format('woff'),
  url('//at.alicdn.com/t/font_uar2ctthurcc8fr.ttf') format('truetype'),
  url('//at.alicdn.com/t/font_uar2ctthurcc8fr.svg#iconfont') format('svg');
}
#app {
  height: 100%;
  background-color:#F5F5F5;
  display: flex;
  flex-direction: column;
}
.cells{
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  min-height: 44px;
  box-sizing: border-box;
  background: #fff;
  overflow: hidden;
}
.cells:after{
  content: "";
  position: absolute;
  left: 15px;
  bottom: 0;
  width: 100%;
  height: 1px;
  border-bottom: 1px solid #E5E5E5;
  color: #D5D5D6;
  -webkit-transform-origin: 0 0;
  transform-origin: 0 0;
  -webkit-transform: scaleY(0.5);
  transform: scaleY(0.5);
}
.cell-title{
  font-size: 16px;
  margin-left: 15px;
  text-align: left;
  color: #666666;
  min-width: 33px;
  letter-spacing: 0;
  line-height: 24px;
  white-space: nowrap;
}
.cell-input{
  flex: 1;
  min-width: 113px;
  padding-left: 13px;
  font-size: 14px;
  color: #333333;
  letter-spacing: 0;
  line-height: 24px;
}
.cell-input:disabled{
  background: #fff;
}
.cell-arrow{
  width: 30px;
  height: 100%;
  display: inline-flex;
}
.cell-arrow:after{
  position: absolute;
  font-family: 'shoper';
  font-size: 14px;
  content: '\e69e';
  top: 10px;
  right: 15px;
  color:#999;
}
.getCode{
  width: 90px;
  height: 30px;
  margin-right: 10px;
  background: #09BB07;
  border-radius: 3px;
  font-size: 14px;
  text-align: center;
  line-height: 30px;
  color: #FFFFFF;
  margin-left: 5px;
}
.cell-position{
  position: relative;
  width: 54px;
  margin-right: 15px;
  font-size: 14px;
  text-align: right;
  color: #09BB07;
  line-height: 14px;
  white-space: nowrap;
  border-left: 1px solid #F5F5F5;
}
.cell-position:before{
  position: absolute;
  font-family: 'shoper';
  font-size: 10px;
  content: '\e693';
  right: 30px;
  top: 0;
  color:#09BB07;
}
.nearby-shops-model{
    background: #fff
  }

  .shops-list{
    padding-left:15px;
  }
  .shops-list li{
    padding:0 15px 15px 0;
    position: relative
  }
  .shops-list li:after{
    position: absolute;
    content: '';
    bottom: 0;
    left: 0;
    height: 1px;
    border-bottom: 1px solid #e5e5e5;
    width: 100%;
    -webkit-transform-origin: 0 100%;
    transform-origin: 0 100%;
    -webkit-transform: scaleY(0.5);
    transform: scaleY(0.5);
  }
  .shops-list li:nth-of-type(n+2){
    padding-top:15px;
  }
</style>
