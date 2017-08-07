<template>
<div class="wraper">
  <div class="content">
    <figure class="shop-img" v-if="photos.length === 1"><img :src="photo" :alt="pageInfo.name" ref="img"></figure>
    <div v-if="photos.length > 1">
        <photos :photoItems="photos"></photos>
    </div>
    <statusTips :reasonContent='pageInfo' v-if="pageInfo.auditstate=='2'"></statusTips>
    <div class="shop-info">
      <my-store-status :storeTitle="pageInfo" :storeStatus="storeStatus"></my-store-status>
      <ul class="tags">
        <li v-for="(item , index) in typeshow">
          <tag :typetext="item" :index="index"></tag>
        </li>
      </ul>
    </div>
    <div @click="getAddress" class="address">
      <get-address :pageInfo="pageInfo"></get-address>
    </div>
    <div class="cells" v-if="pageInfo.typeshow=='服务站'">
      <span class="cell-title cell-name">服务品牌</span>
      <div class="brand-wrap">
        <span class="brands" v-for="item in pageInfo.brands">{{item.brandname}}</span>
      </div>
    </div>
    <div class="cells">
      <span class="cell-title cell-name">联系人</span>{{pageInfo.linkman}}
    </div>
    <div class="cells">
      <span class="cell-title cell-name">手机号</span>{{pageInfo.linkcall}}
    </div>
    <div class="cells-textarea">
      <label class="cell-title text-label">店铺业务</label>
      <div class="cell-textarea">{{pageInfo.description}}</div>
    </div>
    <!-- <div class="cells" @click="jump(`/LicenseList/${pageInfo.id}`)" v-if="pageInfo.typeshow=='驾校'&& pageInfo.auditstate == '1'">
      <label class="cell-title">驾照类型</label>
      <input type="text" placeholder=""  class="cell-input" disabled="" />
      <span class="cell-arrow"></span>
    </div> -->
    <div class="editButton" @click="jump(`/MyShopEdit/${passStatus}`)" v-if="storeStatus == '已驳回'">
      <span>编辑</span>
    </div>
  </div>
</div>
</template>

<script>
import XHR from '../api'
import StatusTips from '../components/global/statusTips.vue'
import GetAddress from '../components/myshop/get-address.vue'
import MyStoreStatus from '../components/myshop/myStoreStatus'
import Tag from '../components/myshop/tag'
import Photos from '../components/global/photos.vue'
import storage from '../store/storage.js'
export default {
  components: {StatusTips, Tag, GetAddress, MyStoreStatus,Photos},
  data () {
    return {
      status: 1,
      storeStatus: '',
      passStatus: '0',  // 0表示已通过 1表示未通过
      pageInfo: {},
      shopid: '',
      typeshow: [],
      photo: '',
      photos:[],        //多图
      brands:[],     // 品牌id
      brandname:[],    // 品牌名字
      serveID:[]         // 要提交的照片信息
    }
  },
  computed: {
    page () { return this.$store.state.page }
  },
  created () {
    this.$store.dispatch('setEdit', {edit: true, source: '浏览'})
    this.shopid = this.$route.params.shopid
    this.getInfo()
  },
  mounted () {  
    this.settitle()
  },
  methods: {
    settitle () {     // 设置标题
      if (this.setApp()!=='other') {
        this.callNativeMethod("onChangeWebTitle",{changeWebTitle:'我的店铺'})
      } else {
        window.document.title = '我的店铺'
        this.hideshare()
      }
    },
    imgerror () {
      if(this.photos.length===1){
        this.$refs.img.onerror = () => {
          this.photo = `https://s.kcimg.cn/wap/images/detail/o2oImg/onerror_${this.pageInfo.typeid}.png`
          this.setdata({'shopimgPreview':this.photo})
        }
      }
    },
    savaInfo () {
      let json = {
        'name':this.pageInfo.name,
        'address':this.pageInfo.address,
        'linkman':this.pageInfo.linkman,
        'linkcall':this.pageInfo.linkcall,
        'shoptypeid':this.pageInfo.typeid,
        'shopimg':this.pageInfo.photo,
        'shopimgPreview':this.photo,
        'lng':this.pageInfo.lng,
        'lat':this.pageInfo.lat,
        'shoptypeshow':this.pageInfo.typeshow,
        'description':this.pageInfo.description,
        'photos':this.photos,
        'serverItems':null
      }
      for (var i = 0; i < this.photos.length; i++) {
        this.serveID.push(this.photos[i].imgUrl)
      }
      json.serverItems=this.serveID
      if (this.pageInfo.typeshow.indexOf('维修') >= 0) {
        json.shoptype = '维修'
      } else {
        json.shoptype = this.pageInfo.typeshow
      }
      this.savaBrans()
      this.setdata(json)
    },
    savaBrans () {
      if (this.pageInfo.typeshow === '服务站') {
        this.$store.dispatch('SetshowBrand', true)
        let brand = this.pageInfo.brands
        for (var i=0;i<brand.length;i++){
          this.brands.push(brand[i].brandid)
          this.brandname.push(brand[i].brandname)
        }
        storage.set('selectText', this.brandname.join(','))
        storage.set('brand', this.brands.join(','))
        this.setdata({'brands':this.brands.join(',')})
      } else {
        this.$store.dispatch('SetshowBrand', false)
      }
    },
    getInfo () {
      XHR.editInfo({'shopId':this.shopid}).then((res)=>{
        this.pageInfo = res.data.data
        this.photo = this.pageInfo.photo
        this.photos = this.pageInfo.photos

        this.$nextTick(()=>{
          this.imgerror()
        })
        this.tag(this.pageInfo.typeshow)
        if (this.pageInfo.auditstate==='0') { 
          this.storeStatus = '审核中'
        } else if(this.pageInfo.auditstate==='2'){
          this.savaInfo()
          this.storeStatus = '已驳回'
        }
      })
      .catch((res) => {
        console.log("请求失败")
      })
    },
    tag (typetext) {
      console.log(typetext)
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
    },
    getAddress () {
      if (this.setApp()!=='other') {
        let location=this.bd09togcj02(this.ShopInfo.lng, this.ShopInfo.lat)
        storage.set("shopinfoMap",this.ShopInfo)
        this.jump(`/LocationLook/${location.lng}/${location.lat}`)
      } else {
        var wx = window.wx
        let location = this.bd09togcj02(this.pageInfo.lng, this.pageInfo.lat)
        wx.openLocation({
          latitude: location.lat, // 纬度，浮点数，范围为90 ~ -90
          longitude: location.lng, // 经度，浮点数，范围为180 ~ -180。
          name: this.pageInfo.name, // 位置名
          address: this.pageInfo.address, // 地址详情说明
          scale: 14
        })
      }
    }
  }
}
</script>

<style scoped>
.wraper{
  flex:1;
  display: flex;
  flex-direction: column;
}
.shop-img{
  min-height: 180px;
  position: relative;overflow: hidden;flex: 1;z-index: 1;display: flex;flex-direction: column;flex-wrap: wrap;
}
.shop-img img{
  width:100%;height:100%;display: block;
}
.content {
  flex:1;
  overflow-y: auto;
  overflow-x: hidden;
  -webkit-overflow-scrolling: touch;
  padding-bottom: 10px;
}
.uploadSuccess{
  padding-left: 15px;
  font-size: 14px;
  color: #333333;
  letter-spacing: 0;
  height: 36px;
  line-height: 36px;
}
.brand-wrap{
  padding: 0 0 10px 0px;
  flex:1;
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
  border: 1px solid #2196F3;
  margin:10px 10px 0 0;
}
.showTag{
  display: flex;
  flex-direction: row;
  background: #fff;
  padding: 0 15px 15px 5px;
  margin-bottom: 10px;
}
.editButton{
  padding:30px 15px 0;
}
.editButton span{
  width: 100%;
  display: block;
  height: 45px;
  background:rgba(255,102,0,1);
  border-radius: 5px;
  font-size: 16px;
  color: #fff;
  text-align: center;
  line-height: 45px;
  margin-top: 30px;
  }
.cell-name{
  margin-right: 13px;
}
.shop-info{
  background: #fff
}
.address{
  margin-bottom: 10px;
  position: relative
}
.address .cells:before{
  content: " ";
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 1px;
  border-top: 1px solid #e5e5e5;
  -webkit-transform-origin: 0 0;
  transform-origin: 0 0;
  -webkit-transform: scaleY(0.5);
  transform: scaleY(0.5);
}
.address .cells:after{
  height: 0;
  border: none;
}
.tags{
  padding-left: 15px;
}
.tags li{
  margin-right: 10px;
  display: inline-block;
  margin-bottom: 10px;
}
.cells-textarea{
  word-break: break-all;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  background: #fff;
}
.text-label{
  margin-top: 10px;
}
.cell-textarea{
  flex: 1;
  padding: 10px;
  min-height: 68px;
  resize: none;
  font-size: 16px;
  color: #333333;
  letter-spacing: 0;
  line-height: 24px;
}
</style>
