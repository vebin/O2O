<template>
  <div class="banner" @click="toAdvert">
    <figure><img :src="data.Img" alt=""></figure>
  </div>
</template>
<script>
export default {
  props: ['data'],
  data () {
    return {
    }
  },
  methods: {
    toAdvert () {
      if (this.data.Type === '2') {
        window.location.href = this.data.Link
      } else {
        this.jump(`/ShopDetail/${this.data.ShopId}/1`)
      }
    }
  }
}
</script>
<style scoped>
/*更改样式*/
.banner{
  display: flex;
  width: 100%;
  height: 60px;
  background-color: #fff;
}
.banner figure{
  height: 60px;
  position: relative;
  overflow: hidden;
  -webkit-box-flex: 1;
  -webkit-flex: 1;
  flex: 1;
  z-index: 1;
  display: -webkit-flex;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
}
.banner figure img{
  width: 100%;
  height: 100%;
  -webkit-object-fit: cover;
  object-fit: cover;
  display: block;
}
/*the-end*/
.advert{
  display: flex;
  background: #fff;
  margin-top: 10px;
  margin-bottom: 10px;
  height: 60px;
}
.fore{
  display: block;
  background: #fff;
  margin-top: 10px;
  margin-bottom: 10px;
  width: 100%;
}
.three_list{
  display: flex;
  background: #fff;
  margin-top: 10px;
  margin-bottom: 10px;
  width: 100%;
}
.fore:after{
  content: '';
  clear: both;
  display: block;
}
.advert-list{
  position: relative;
}
.fore .advert-list{
  width: 50%;
  display: block;
  float: left;
  height: 60px;
  border-right: 1px solid #eee;
  box-sizing: border-box;
}
.fore .advert-list:after{
  content: '';
  position: absolute;
  border-right: 1px solid #eee;
  height: 100%;
}
.advert .advert-list{
  flex:1;
  border-right: 1px solid #eee
}
.fore .advert-list:nth-of-type(1),.fore .advert-list:nth-of-type(2){
  border-bottom: 1px solid #eee;
}
.three_list .advert-list{
  display: block;
  width: 33.333%;
  border: 1px solid #eee;
  box-sizing: border-box;
}
.advert-list img{
  border: 0 none;
  width: 100%;
  height: 100%;
}
.advert .advert-list:last-child{border:none;}

</style>
