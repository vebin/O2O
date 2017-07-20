<template>
  <div :class="[loading ? 'jump-cover' : 'load-wrap']">
    <div class="loading" v-if="!end">
      <span class="loading-ring">等</span>
    </div>
    <div class="list-end" v-else>已经到底了</div>
  </div>
</template>
<script>
export default {
  props: ['end','loading'],
  data () {
    return {

    }
  }
}
</script>
<style>
.load-wrap{background: #f5f5f5;overflow: hidden;}
.jump-cover{position: fixed;left:0;top:0;width: 100%;height:100%;z-index: 1001;background: #f5f5f5;}
.jump-cover .loading{position: absolute;margin:0;left:50%;top:50%;-webkit-transform: translate3d(-50%,-50%,0);transform: translate3d(-50%,-50%,0);}


  /* loading */
.loading{position: relative;margin:30px auto;width:85px;padding-top: 33px;font-size: 0;color: #999; overflow: hidden; text-align: center; 
  background: url(data:image/png;base64,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) no-repeat 50% 0;
  -webkit-background-size: 192px 30px;background-size: 192px 30px;-webkit-animation: loaing-animation linear 1.5s infinite; animation: loaing-animation linear 1.5s infinite;}
.loading:before{content: '';position: absolute;left: 0;top: 0;width: 100%;height: 30px;
background: -webkit-gradient(linear, 0 0, 100% 0,from(#f5f5f5), color-stop(0.1, rgba(245,245,245,0)), color-stop(0.9, rgba(245,245,245,0)),to(#f5f5f5));
    background: linear-gradient(90deg,#f5f5f5 0, rgba(245,245,245,0) 10%, rgba(245,245,245,0) 90%,#f5f5f5 100%);
}
.loading:after{content: '\6b63\5728\52a0\8f7d\4e2d...';font-size: 12px;}
.loading.visible{display: block;}
.loading-ring{content: '';position: absolute;left: 50%;top:9px;margin-left: -27px;width: 49px; height:18px;font-size: 0;
background: url(data:image/png;base64,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) no-repeat 0 0;
-webkit-background-size: 49px 18px;background-size: 49px 18px;}
.loading-ring:before,.loading-ring:after{content: '';position: absolute;left: 19px;top: 16px;width: 5px; height: 5px;
background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAALCAMAAACecocUAAAAeFBMVEUAAAAtg+wWcuYWceYbfPIdeOgbdugWc+UWceYfeuswhewVceYXcuYWcuYWceYWcucWcub///8mfeoYdOYXceYXcuYVcuYVcuYWcuUVc+UYc+cWcukXdOiAvf8VceVmqvliqPlTnfVusftbo/dMmPNAj/Bfpvc0h+2wExoJAAAAHXRSTlMA/vLHCfz80ZgZ/v79oIZrWgH9/OHe1b68p0kvLOvWZswAAABkSURBVAjXLchFFoQwFAXR9+M4rXgSfP87JMgd1SkAkdGM5wJBy9J4peTXh8ve07x4p7SASadxX8httoCOZz+cZAa2Djfi4PS0MsgTd+VoS4iv9Gd+6hfQ/a0kZasIgSganpXhHiAsCHiVxbUOAAAAAElFTkSuQmCC) no-repeat 0 0;
-webkit-background-size: 5px 5px;background-size: 5px 5px; -webkit-animation: wheel linear 0.2s infinite; animation: wheel linear 0.2s infinite; }
.loading-ring:after{left: 40px;}
 @-webkit-keyframes loaing-animation {
  0% { background-position: 10% 0;}
  100% {background-position: 100% 0; }
}
@keyframes loaing-animation {
  0% { background-position: 10% 0;}
  100% {background-position: 100% 0; }
}

@-webkit-keyframes wheel{
  0% {-webkit-transform:rotate(0deg);}
  100% {-webkit-transform:rotate(360deg);}
}
@keyframes wheel{
  0% {transform:rotate(0deg);}
  100% {transform:rotate(360deg);}
}
.list-end {margin: 30px auto;line-height: 20px; color: #999; font-size: 14px;text-align: center;}
</style>
