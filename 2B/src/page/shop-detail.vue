<template>
  <div class="wrapper">
    <div class="content" @scroll="loadMore">
      <figure class="shop-img">
        <img :src="photo" :alt="ShopInfo.name" ref="img">
      </figure>
      <div class="reject" v-if="ShopInfo.auditstate=='2'">
        驳回原因：{{ShopInfo.faildescription}}
      </div>
      <div class="shop-info">
        <my-store-status :shopinfo="ShopInfo"></my-store-status>
        <ul class="tags">
          <li v-for="(item , index) in typeshow">
            <tag :typetext="item" :index="index"></tag>
          </li>
        </ul>
      </div>
      <div @click="getAddress" v-if="ShopInfo.address">
        <get-address :address="ShopInfo.address" :class="[ShopInfo.typeshow== '服务站' ?'':'addresss']"></get-address>
      </div>
      <div class="cells service" v-if="ShopInfo.typeshow=='服务站'">
        <span class="cell-title cell-name">服务品牌</span>
        <div class="brand-wrap">
          <span class="brands" v-for="item in ShopInfo.brands">{{item.brandname}}</span>
        </div>
      </div>
      <section class="driving-list" v-if="ShopInfo.typeshow == '驾校'">
        <ul>
          <li v-for="item in driverList">
            <a :href="`#/LicenseDetail/${item.shopId}/${item.infoId}`"><driving-cell :driverInfo='item'></driving-cell></a>
          </li>
        </ul>
        <div class="data-null" v-if="!driverList.length">
          <data-null :title='title' :text="text"></data-null>
        </div>
      </section>
      <div v-if="ShopInfo.description">
        <description :descript="ShopInfo.description" ></description>
      </div>
      <div class="services">
        <ul>
          <li v-for="item in business" >
            <services-item :service="item"></services-item>
          </li>
        </ul>
        <div class="consult">价格仅作参考</div>
      </div>
      <div class="comments" v-if="ShopInfo.business.length">
        <header>卡友评价（{{ShopInfo.business.length}}）</header>
        <ul>
          <li v-for="item in ShopInfo.business" >
            <comments-item :comment="item"></comments-item>
          </li>
        </ul>
        <div>
            <loading :end="list_end" :loading="loading"></loading>
        </div>
      </div>
    </div>
    <a href="JavaScript:history.back(-1)" @click.prevent="toback"><go-back></go-back></a>
    <div class="footer">
      <shopfooter :shopinfo="ShopInfo" :photo="photo"></shopfooter>
    </div>
    <toast :msg="toast" v-if="page.toast"></toast>
  </div>
</template>

<script>
import XHR from '../api'
import MyStoreStatus from '../components/shopdetail/myStoreStatus.vue'
import Tag from '../components/shopdetail/tag.vue'
import GetAddress from '../components/shopdetail/get-address.vue'
import Shopfooter from '../components/shopdetail/ShopFooter.vue'
import DrivingCell from '../components/shopdetail/driving-cell.vue'
import DataNull from '../components/global/data-null.vue'
import GoBack from '../components/global/go-back.vue'
import storage from '../store/storage.js'
import Description from '../components/shopdetail/shop-descript.vue'
import ServicesItem from '../components/shopdetail/important-service.vue'
import CommentsItem from '../components/shopdetail/comment.vue'
import Loading from '../components/global/loading.vue'
import Toast from '../components/global/comment-toast.vue'
export default {
  components: {MyStoreStatus, Tag, GetAddress, Shopfooter, DrivingCell, DataNull, GoBack, Description, ServicesItem, CommentsItem, Loading, Toast},
  data () {
    return {
      headstatus: 1,
      ShopInfo: {},
      driverList: [],
      typeshow: [],
      title: '很遗憾',
      text: '该驾校还没有上传驾照信息',
      photo: '',
      scales: 14,
      pages: 1,
      loamore: false,
      discuss: [],
      list_end: false,
      loading: false,
      toast:'',
      business: 
      [
          {
              businessId: "3",         //业务ID
              businessTitle: "测试三asdsadas测试三asdsadas测试三asdsadas测试三asdsadas测试三asdsadas测试三asdsadas",//业务名称
              businessImg: "https://img1.kcimg.cn/peripheral/2017/0125/0125192832.jpg!120",//业务图片
              businessPrice: "125.98"//业务价格
          },
          {
              businessId: "2",
              businessTitle: "测试二",
              businessImg: "https://img1.kcimg.cn/peripheral/2017/0123/0123221840.jpg!120",
              businessPrice: "123.65"
          },
          {
              businessId: "1",
              businessTitle: "测试一",
              businessImg: "https://img1.kcimg.cn/peripheral/2017/0122/0122000153.jpg!120",
              businessPrice: "123"
          }
      ]
    }
  },
  created () {
    if (/(iPhone|iPad|iPod|iOS)/i.test(window.navigator.userAgent)) {
        this.scales = 14
    } else if (/(Android)/i.test(window.navigator.userAgent)) {
        this.scales = 16
    }
    if (this.$route.params.typeid=== '9') {
      this.getJingXiaoSang()
    }else{
      if (this.$route.params.type === '0') {
        this.getDetailInfoWait()
      } else {
        this.getDetailInfo()
      }
    }
  },
  mounted () {  // 默认图片
    this.settitle()
    this.$refs.img.onerror = () => {
      this.photo = `https://s.kcimg.cn/wap/images/detail/o2oImg/onerror_${this.ShopInfo.typeid}.png`
    }
  },
  methods: {
    comments () {
       XHR.getComment({'shopId':this.$route.params.shopid, 'page': this.pages}).then((res) => {
          this.discuss = res.data.data
          if (this.discuss.length<10) {
            this.list_end = true
            this.loamore = true
          }
       })
    },
    loadMore(e){
      if (e.target.scrollTop + window.innerHeight >= e.target.scrollHeight && !this.loamore){
        this.loamore = true
        XHR.getComment({'shopId':this.$route.params.shopid, 'page': this.pages ===1?2:this.pages }).then((res) => {
          let datas = res.data.data
          this.discuss = this.discuss.concat(datas)
          if (datas.length<10) {
            this.list_end = true
            this.loamore = true
          }else{
            this.pagenum += 1
            this.loamore = false
          }
        })
      }
    },
    settitle () {     // 设置标题
      if (this.setApp()==='other') {
        window.document.title = '店铺详情'
        this.comments()
      } else {
        this.callNativeMethod("onChangeWebTitle",{changeWebTitle:'店铺详情'})
      }
    },
    toback(){
      if(this.$parent.watchSource===''){
        this.jump('/')
      }else{
        window.location.href='JavaScript:history.back(-1)'
      }
    },
    getJingXiaoSang () {                 // 经销商店铺数据
      XHR.getdealerDetail({'id': this.$route.params.shopid}).then((res) => {
        this.ShopInfo = res.data
        this.photo = res.data.photo
        let c = res.data.linkcall
        this.ShopInfo.linkcall = c.substring(0,11)
        let typetext = res.data.typeshow
        if (typetext === '驾校') {
          this.getDrivingList()
        }
        if (typetext.indexOf('维修') >= 0) {
          if (typetext === '维修') {
            this.typeshow.push('维修')
          } else {
            let datas = typetext.substring(3, typetext.length)
            console.log(datas ,564)
            this.typeshow = datas.split(',')
          }
        } else {
          this.typeshow.push(typetext)
        }
      })
    },
    getDetailInfo () {                    // 通过审核店铺数据
      XHR.getShoperInfo({'shopid': this.$route.params.shopid}).then((res) => {
        this.ShopInfo = res.data
        let c = res.data.linkcall
        this.ShopInfo.linkcall = c.substring(0,11)
        this.photo = res.data.photo
        let typetext = res.data.typeshow
        if (typetext === '驾校') {
          this.getDrivingList()
        }
        if (typetext.indexOf('维修') >= 0) {
          if (typetext === '维修') {
            this.typeshow.push('维修')
          } else {
            let datas = typetext.substring(3, typetext.length)
            console.log(datas ,564)
            this.typeshow = datas.split(',')
          }
        } else {
          this.typeshow.push(typetext)
        }
      })
    },
    getDetailInfoWait () {             // 未通过审核店铺数据
      XHR.noAdoptInfo({'waiterid': this.$route.params.shopid}).then((res) => {
        this.ShopInfo = res.data
        // 取电话11位
        let c = res.data.linkcall
        this.ShopInfo.linkcall = c.substring(0,11)
        this.photo = res.data.photo
        let typetext = res.data.typeshow
        if (typetext === '驾校') {
          this.getDrivingList()
        }
        if (typetext.indexOf('维修') >= 0) {
          if (typetext === '维修') {
            this.typeshow.push('维修')
          } else {
            let datas = typetext.substring(3, typetext.length)
            this.typeshow = datas.split(',')
          }
        } else {
          this.typeshow.push(typetext)
        }
      })
    },
    getDrivingList () {
      XHR.getDriveList({'shopid': this.$route.params.shopid}).then((res) => {
        this.driverList = res.data.data
      })
    },
    getAddress () {
      if (this.setApp()!=='other') {
        let location=this.bd09togcj02(this.ShopInfo.lng, this.ShopInfo.lat)
        storage.set("shopinfoMap",this.ShopInfo)
        this.jump(`/LocationLook/${location.lng}/${location.lat}`)
      } else {
        let location=this.bd09togcj02(this.ShopInfo.lng, this.ShopInfo.lat)
        wx.openLocation({
            latitude: location.lat, // 纬度，浮点数，范围为90 ~ -90
            longitude: location.lng, // 经度，浮点数，范围为180 ~ -180。
            name: this.ShopInfo.name, // 位置名
            address: this.ShopInfo.address, // 地址详情说明
            scale: this.scales
        })
      }
    }
  }
}
</script>

<style scoped>
  .wrapper{
    display: flex;
    position: relative;
    flex-direction: column;
    overflow: hidden;
    width: 100%;
    height: 100%;
  }
  .content{
    height: 100%;
    overflow-y: auto;
    -webkit-overflow-scrolling:touch;
    padding-bottom: 50px;
    box-sizing: border-box;
  }
  .shop-img{
    height: 210px;
    overflow: hidden;
    display: flex;
  }
  .shop-img img{
  width:100%;height:100%;-webkit-object-fit: cover;object-fit: cover;display: block;
  object-fit: cover;
  }
  .driving-list{
    border-top: 10px solid #F5F5F5;
  }
  .driving-list ul{
    padding-left: 15px;
    box-sizing: border-box;
    background: #fff;
  }
  .cells.service:after{
    content: '';
    height: 0;
    border: none;
  }
  .driving-list ul li{
    padding: 15px 15px 15px 0;
    border-bottom: 1px solid #e5e5e5;
  }
  .driving-list ul li:last-child{
    border: none;
  }
  .shop-info{ 
    border-bottom: 10px solid #F5F5F5;
    padding-bottom: 15px;
    background: #fff
  }
  .footer{
    position: fixed;
    left: 0;
    bottom: 0;
    z-index: 100;
    right: 0;
  }
  .tags{
    padding-left: 15px;
  }
  .tags li{
    margin-right: 10px;
    display: inline-block;
  }
  .data-null{
    background: #fff;
    min-height: 200px;
    padding-bottom: 36px;
    box-sizing: border-box;
    overflow: hidden;
  }
  .reject{
    height: 36px;
    background: #F63711;
    color: #fff;
    font-size: 14px;
    line-height: 36px;
    padding-left: 15px;
  }
  .reject:before{
    content: '\9519';
    font-family: 'shoper';
    margin-right: 5px;
  }
  .brand-wrap{
  flex:1;
  margin:10px 0 0 10px;
}
.brands{
  line-height: 18px;
  padding: 1px 4px;
  text-align: center;
  font-size: 12px;
  color: #2196F3;
  border-radius: 2px;
  display: inline-block;
  float: left;
  margin:0px 10px 10px 0;
  position: relative
}
.brands:after{
  content: " ";
  position: absolute;
  left: 0;
  top:-1px;
  width: 200%;
  height: 200%;
  border: 1px solid #2196F3;
  -webkit-transform-origin: 0 0;
  transform-origin: 0 0;
  -webkit-transform: scale(0.5);
  transform: scale(0.5);
  border-radius: 4px; 
}
.addresss:after{
  content: '';
  height: 0;
}
.services{
    background: #fff;
    margin-bottom: 10px;
    margin-top: 10px;
}
.services ul li{
  padding: 0 0 0 15px;
  min-height: 60px;
  position: relative
}
.comments ul li{
  padding: 0 15px 15px;
  position: relative;
  background: #fff;
}
.comments ul li:after{
  content: " ";
  position: absolute;
  left: 15px;
  bottom: 0;
  width: 100%;
  height: 1px;
  border-bottom: 1px solid #e5e5e5;
  -webkit-transform-origin: 0 100%;
  transform-origin: 0 100%;
  -webkit-transform: scaleY(0.5);
  transform: scaleY(0.5);
}
.comments ul li:last-child:after{
  border: none;
}
.comments >header{
  font-size: 18px;
  color: #222222;
  line-height: 27px;
  padding: 10px 0 0 15px;
  background: #fff;
}
.consult{
  font-size: 12px;
  color: #999999;
  letter-spacing: 0;
  line-height: 43px;
  text-align: center;
  background: #fff;
}
</style>
