<template>
  <a :href="`#/ShopDetail/${shopData.id}/${type}`" class="nearby-list"  @click.prevent="savePositon">
    <figure class="shop-img">
      <img :src="photo" class="list-img" ref="img" />
    </figure>
    <div class="list-info">
      <div class="title">
        <h2 class="info-title">{{shopData.name}}</h2>
        <span class="title-status" v-if="shopData.certified === '1'">已认证</span>
      </div>
      <div class="info-between">
        <span class="info-label" v-if="shopData.typeshow!=='服务站' && shopData.typeshow!=='驾校' && shopData.shoptypeid!=='1'">{{shopData.typeshow}}</span>
        <div v-if="shopData.typeshow==='服务站'&& shopData.brands" class="brands-wrap">
          <span v-for="(item,index) in shopData.brands" class="brands" v-if="index < 1">{{item.brandname}}</span>
          <span style="color:#2196F3;padding-bottom:9px;margin-left:5px;" v-if="shopData.brands.length >1">...</span>
        </div>
        <span v-if="shopData.typeshow=='驾校'" class="prices">{{regis}}</span>
        <div v-if="shopData.shoptypeid==='1'" class="weixiu">
          <span class="info-label">{{shopType}}</span>
          <div class="desc">{{typeDscript}}</div>
        </div>
      </div>
      <div class="position" v-if="shopData.address">
        <span class="info-position">{{shopData.address}}</span>
        <span class="list-range" v-if="shopData.distanceKM">{{distanceKM}}</span>
      </div>
    </div>
  </a>
</template>

<script>
import storage from '../../store/storage.js'
export default {
  props: ['shopData','type'],
  created () {
    if (this.$route.params.typeid === '9'){
      this.distanceKM = this.shopData.distanceKM + 'km'
    }else{
      this.changeNumber()
    }
    if (this.shopData.registerFee !=='') {
      this.regis = '￥'+this.shopData.registerFee+'元起'
    }
    if (this.shopData.typeshow && this.shopData.typeshow.indexOf('维修')>-1) {
      this.shopType = '维修'
      let desc = this.shopData.typeshow.substring(3)
      this.typeDscript = desc.replace(/,/, " | ")
    }
  },
  data () {
    return {
      distanceKM: '',
      photo: this.shopData.photo,
      shoptypeid: 1,
      watchSource: '',
      regis:'',
      shopType:'',            // 维修类别
      typeDscript:''      // 维修包含的小分类
    }
  },
  mounted () {  // 默认图片
    this.$refs.img.onerror = () => {
      this.photo = `https://s.kcimg.cn/wap/images/detail/o2oImg/onerror_${this.shopData.shoptypeid}.png`
    }
  },
  methods: {
    savePositon(e){
      let nowSource = this.$route.path
      if (nowSource && nowSource.indexOf("ShopTypeDetail") > -1) {
         if (this.$route.params.typeid === '9') {
              location.href = `https://dealerm.360che.com/${this.shopData.id}`
          } else {
            location.href = this.$el.href
          }
        let contains = document.querySelector('.nearby-shops-model')
        if (contains) {
          storage.set('detailPosition',contains.scrollTop)
        }
        
      } else {
        let contains = document.querySelector('.container')
        if (contains) {
          storage.set('position',contains.scrollTop)
        }
        location.href = this.$el.href
      }
     
      
    },
    changeNumber () {  // 转换距离
      var c = Number(this.shopData.distanceKM)
      if (c !== 0 && c > 1000) {
        var num = c/1000
        num = num.toFixed(2)
        this.distanceKM = num + 'km'
        return this.distanceKM
      } else if (c === 0) {
        this.distanceKM = ''
        return this.distanceKM
      } else {
        this.distanceKM = c + 'm'
        return this.distanceKM
      }
    }
  }
}
</script>
<style scoped>
  .nearby-list{
    background: #fff;
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  .shop-img{
    width: 90px;
    height: 60px;
    position: relative;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    z-index: 1;
  }
  .shop-img:empty:before{background: #fff}
  .shop-img img{background: #fff}
  .shop-img:before{
    position: absolute;
    left:0;
    top:0;
    content:"";
    width: 100%;
    height: 100%;
    background: #efefef url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHMAAAApBAMAAAD0eAtEAAAAFVBMVEXv7+/R0dHX19fc3Nzp6eng4ODk5OQNpKnjAAACnElEQVRIx9WWTW/bMAyGPVvRuVQan2M16NnOx85O4u2cbPXdHrD8/5+wl6IVWcpQFOipLKCUlB69JSkGzT5nubUvUUBZazfeWRDREPa+Ea0iz0ToEafbj6LUi70pXuEb5w4/+v4XvAM72oWufq8V9G7rkeb2c+4UFNkQo0ZHu8/jR1DrrD5hqe5ut7XeBDW7yQRNy6QQLrPEjoIuvZ+i4dS+6+Ju0aRqJ0vQcMqk3Tpx4lE969DX6NTfBFWVNFrfKsaWt9utTVE5VS4SNHeisILoj6tE1wmrcctcdEjRyqfW0HPOaCGv7bwLdsAmOrD1bbiIqK/5mei7U21o48oSDIG4720keiKxsiDDO8fkhTTz1xSJchkkVxFFwh1o051JOq4QOCNwgwXRi+yMVObYE9FQ4SZ0a1YmVXMKq3vPh1z+nAgtRDZBcxOu1I2UkFJVkU3RisKN46yeMVqQPNLZ7LzmREFUNkhkIxSyqQ1zUTmBChuWjdEiJVcSWXsSLle4HEU2ecNxrg3Ayg/+C0gaGNV83/son32GI1Y33JUT0Ixl30NFtPXvbamh3KqKq6bxvgd3efoVrqdAB5s+3JT5s1/YXEbKpSM5LVAFhTkvdlnf/97hMUnMLa1GhZQEcx4qmWcto1m53q1RWzVNscTcoU1BS+w8ZfINU2HwD/1bNpr+Su2CNl3r0VK+kjXHeGkMur0noGLNKue7gaLJbcHv3aNPvtVrLNi4Aq3I3NEK6OUB7UZRbVN0jx9Br0RAiUyMvhJJrg9ofVaCKuQK9GVL6whd9Q3QFUrwgGYqzhXu/3P9DIo1QTNB8dh5tLDWR7KVcV+4ZtbXNV/AMd6gckLD/ysNxoohvv1kba1sjU9lYVmG38+WA/AGzfOG1/QP24+i/flJ+D4AAAAASUVORK5CYII=) no-repeat 50% 50%;
    -webkit-background-size: 58px 20px;background-size: 58px 20px;
    z-index: -1;
  }
  .list-img{
    width: 100%;
    height: 100%;
    -webkit-object-fit: cover;
    object-fit: cover;
    display: block;
  }
  .list-info{
    margin-left: 10px;
    flex: 1;
    min-height: 60px;
    overflow:hidden;
    position: relative;
  }
  .prices{
    color: #FF6600;
    font-size: 14px;
  }
  .title{
    display: flex;
    flex-direction: row;
  }
  .title-status{
    width: 54px;
    font-size: 12px;
    color: #FEA802;
    letter-spacing: 0;
    line-height: 16px;
    text-align: right;
    margin-top: -2px;
  }
  .title-status:before{
    content:"\e6f9";
    font-family: 'shoper';
    font-size: 12px;
    margin-right: 5px;
    vertical-align: middle;
  }
  .info-title{
    flex: 1;
    display: -webkit-box;
    text-overflow: ellipsis;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
    font-size: 16px;
    color: #333333;
    letter-spacing: 0;
    line-height: 18px;
    height: 18px;
    font-weight: bold;
  }
  .info-label{
    font-size: 12px;
    color: #FF6600;
  }
  .info-between{
    display: flex;
    align-items: center;
    height: 28px;
    line-height: 28px;
  }
  .brands-wrap{
    font-size:0;
    height:24px;
    overflow:hidden;
  }
  .brands{
    display: inline-block;
    font-size: 12px;
    color: #2196F3;
    line-height: 18px;
    height: 16px;
    padding: 0 2px;
    margin-top: 3px;
    margin-right:5px;
    position: relative;
  }
  .brands:after{
    content: "";
    position: absolute;
    left: 0;
    top:0;
    width: 200%;
    height: 200%;
    border: 1px solid #2196F3;
    -webkit-transform-origin: 0 0;
    transform-origin: 0 0;
    -webkit-transform: scale(0.5);
    transform: scale(0.5);
    border-radius: 4px; 
  }
  .position{
    flex: 1;
    display: flex;
    flex-direction: row;
    padding: 0;
    position: absolute;
    right: 10px;
    bottom: 0;
    left: 0;
    right: 0;
  }
  .info-position{
    flex: 1;
    overflow: hidden;white-space: nowrap;text-overflow: ellipsis;
    font-size: 12px;
    line-height: 12px;
    margin-top: 8px;
    color: #bbb;
    display: block;
  }
  .info-position:before{
    content: "\e693";
    font-family: 'shoper';
    font-size: 10px;
    color: #ccc;
    margin-right: 5px;
  }
  .list-range{
    align-self: flex-end;
    height: 100%;
    text-align: right;
    font-size: 12px;
    color: #999;
    line-height: 12px;
    margin-top: 8px;
  }
  .weixiu {
    display: flex;
    flex-direction: row
  }
  .weixiu .desc{
    margin-left: 10px;
    flex: 1;
    font-size: 12px;
    color: #666;
    display: -webkit-box;
    text-overflow: ellipsis;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
</style>
