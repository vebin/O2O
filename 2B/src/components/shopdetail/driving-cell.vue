<template>
<div class="driving-cell">
  <figure class="photo">
    <img :src="photo" alt="" ref="img">
  </figure>
  <div class="info">
      <h2>{{driverInfo.licenseText}}驾照</h2>
    <div class="footer">
      <span>{{driverInfo.carType}}</span>
      <strong>{{`￥`+driverInfo.registerFee}}</strong>
    </div>
  </div>
</div>
</template>

<script>
export default {
  props: ['driverInfo'],
  data () {
    return {
      photo:''
    }
  },
  mounted () {  // 默认图片
    this.$refs.img.onerror = () => {
      this.photo = `https://s.kcimg.cn/wap/images/detail/o2oImg/onerror_10.png`
    }
  },
  created () {
    this.photo = this.driverInfo.img
  }
}
</script>

<style scoped>
  .driving-cell{
    display: flex;
    position: relative;
  }
  .driving-cell:after{
    content: '';
    height: 1px;
    border-top:1px solid #eee;
  }
  .photo{
    position: relative;
    width: 100px;
    height: 70px;
    margin-right: 10px;
    z-index: 1;
  }
  .photo:before{
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
   .photo img{
    width: 100%;
    height: 100%;
    -webkit-object-fit: cover;
    -o-object-fit: cover;
    object-fit: cover;
    display: block;
  }
  .info{
    flex:1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .footer{
    font-size: 14px;
    color: #666666;
    line-height: 18px;
  }
  .footer strong{
    font-size: 18px;
    color: #FD4C29;
    float: right;
  }
</style>
