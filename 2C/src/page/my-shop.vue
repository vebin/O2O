<template>
<div class="wraper">
  <div class="content" v-if="!datanull">
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
    <div class="cells no-line">
      <span class="cell-title cell-name">手机号</span>{{pageInfo.linkcall}}
    </div>
    <!-- <div class="cells" @click="jump(`/LicenseList/${pageInfo.id}`)" v-if="pageInfo.typeshow=='驾校'&& pageInfo.auditstate == '1'">
      <label class="cell-title">驾照类型</label>
      <input type="text" placeholder=""  class="cell-input" disabled="" />
      <span class="cell-arrow"></span>
    </div> -->
    <div class="drive-wrap" v-if="pageInfo.typeshow=='驾校'&& pageInfo.auditstate == '1'">
      <header>驾考类型 <a href="#/AddLicenseInfo/0" class="to-add">添加</a></header>
        <ul v-if="driveData.length">
          <li v-for="(item ,index) in driveData">
            <drive-list :drives="item" :index="index" @remove="remove"></drive-list>
          </li>
          <li class="list-end">已经到底了哦～</li>
        </ul>
        <div v-if="!driveData.length">
            <drive-null></drive-null>
        </div>
    </div>
    <div class="editButton" @click="jump(`/MyShopEdit/${passStatus}`)" v-if="storeStatus == '已驳回'">
      <span>编辑</span>
    </div>
  </div>
  <!-- 无数据提示 -->
  <div class="datas-null" v-if="datanull">店铺信息已被隐藏，请联系官方人员</div>
  <bottomList v-if="storeStatus !== '审核中' && storeStatus !== '已驳回' && !datanull" :pageInfo="pageInfo" :status="passStatus"></bottomList>
  <a href="/index.html"><go-back></go-back></a>
  <confirm @confirm="confirm" :msg="confirmMsg" v-if="showConfirm"></confirm>
  <toast :msg="toast" v-if="toastState"></toast>
</div>
</template>

<script>
import XHR from '../api'
import { mapGetters, mapActions } from 'vuex'
import StatusTips from '../components/global/statusTips.vue'
import BottomList from '../components/myshop/bottomList.vue'
import GetAddress from '../components/myshop/get-address.vue'
import MyStoreStatus from '../components/myshop/myStoreStatus'
import Tag from '../components/myshop/tag'
import GoBack from '../components/global/go-back.vue'
import storage from '../store/storage.js'
import Photos from '../components/global/photos.vue'
import DriveList from '../components/myshop/drive-list.vue'
import DriveNull from '../components/myshop/drive-null.vue'
import Toast from '../components/global/toast.vue'
import Confirm from '../components/global/confirm.vue'
export default {
  components: {StatusTips, Tag, GetAddress, MyStoreStatus, BottomList, GoBack,Photos,DriveList,DriveNull,Toast,Confirm},
  data () {
    return {
      status: 1,
      storeStatus: '',
      passStatus: '0',  // 0表示已通过 1表示未通过
      pageInfo: {},
      shopid: '',
      typeshow: [],
      photo: '',
      brands:[],     // 品牌id
      brandname:[],    // 品牌名字
      photos:[],        //多图
      driveData:[],       //驾照类型列表
      toast:'',
      datanull:false,        // 判断接口是否有数据
      confirmMsg: '确认删除该信息吗？<br/>删除后，不可恢复哦～',
      showConfirm:false,
      deleteIndex:'',       // 要删除的驾照类型索引
      driveinfo:{},         // 要删除的驾照类型对象
      serveID:[]         // 要提交的照片信息
    }
  },
  computed: {
    page () { return this.$store.state.page },
    ...mapGetters(['toastState'])
  },
  created () {
    this.$store.dispatch('setEdit', {edit: true, source: '浏览'})
    this.shopid = this.$route.params.id
    this.passStatus = this.$route.params.status
    this.setdriver({'shopid':this.shopid})   // 储存店铺id 添加驾考列表的时候需要用到
    if (this.passStatus === '0') {  // 代表已通过
      this.pass()
    } else {
      this.noPass()
    }
    this.getDriveLists()
  },
  mounted () {  // 默认图片
    this.settitle()
  },
  methods: {
    ...mapActions(['toggleToast']),
    getDriveLists () {
      XHR.getDriveList({shopId: this.shopid}).then( (res) => {
        this.driveData = res.data.data
      })
    },
    showToast (msg) {
      this.toast = msg
      this.toggleToast()
    },
    confirm (type) {                     // 删除confirm
      if (type === 'delete') {
        this.deleteDriverType()
      }
      this.showConfirm = false
    },
    remove (index,drives) {
      this.driveinfo = drives
      this.deleteIndex = index
      this.showConfirm = true
    },
    deleteDriverType () {   // 驾校驾照类型删除
      XHR.deleteDriverType({'shopId':this.driveinfo.shopId,'infoId':this.driveinfo.infoId}).then((res)=>{
        if (res.data.status===1) {
          this.driveData.splice(this.deleteIndex, 1)
        }
        this.showToast(res.data.msg)
      })
    },
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
        'id':this.pageInfo.id,
        'bbsid':this.pageInfo.bbsid,
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
    pass () {
      XHR.getShoperInfo({'shopid': this.shopid}).then((res) => {
        if (!res.data) {
          this.datanull = true 
          return 
        }
        this.pageInfo = res.data
        this.photo = res.data.photo
        this.photos = res.data.photos
        this.$nextTick(()=>{
          this.imgerror()
          this.savaInfo()
          this.datanull = false
        })
        localStorage.setItem('Myshop', JSON.stringify(res.data))
        if (res.data.certified === '1') {
          if (res.data.modifystatus ==='1') {
            this.storeStatus = '查看修改状态'
          } else{
            this.storeStatus = '已认证'
          }
        } else {
          if (res.data.auditstate === '0') {
            this.storeStatus = '审核中'
          } else if (res.data.auditstate === '2') {
            this.storeStatus = '已驳回'
          } else if (res.data.auditstate === '1') {
            if (res.data.modifystatus === '1') {
              this.storeStatus = '查看修改状态'
            } else {
              this.storeStatus = ''
            }
          }
        }
        this.tag(res.data.typeshow)
      })
    },
    noPass () {
      XHR.noAdoptInfo({'waiterid': this.shopid}).then((res) => {
        if (!res.data) {
          this.datanull = true
          return 
        }
        this.pageInfo = res.data
        this.photo = res.data.photo
        if (res.data.photos) {
          this.photos = res.data.photos
        } else{
          this.photos.push({imgUrl:this.photo})
        }
        this.$nextTick(()=>{
          this.imgerror()
          this.savaInfo()
          this.datanull = false
        })
        localStorage.setItem('Myshop', JSON.stringify(res.data))
        if (res.data.certified === '1') {
          if (res.data.modifystatus ==='1') {
            this.storeStatus = '查看修改状态'
          } else{
            this.storeStatus = '已认证'
          }
        } else {
          if (res.data.auditstate === '0') {
            this.storeStatus = '审核中'
          } else if (res.data.auditstate === '2') {
            this.storeStatus = '已驳回'
          } else if (res.data.auditstate === '1') {
            if (res.data.modifystatus === '1') {
              this.storeStatus = '查看修改状态'
            } else {
              this.storeStatus = ''
            }
          }
        }
        this.tag(res.data.typeshow)
      })
    },
    tag (typetext) {
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
  position: relative;
  overflow: hidden;
  flex: 1;
  z-index: 1;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
}
.shop-img img{
  width:100%;
  height:100%;
  display: block;
}
.content {
  flex:1;
  overflow-y: auto;
  overflow-x: hidden;
  -webkit-overflow-scrolling: touch;
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
  background: #09BB07;
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
.tags{
  padding-left: 15px;
}
.tags li{
  margin-right: 10px;
  display: inline-block;
  margin-bottom: 10px;
}
.address{
  margin-bottom: 10px;
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
  content: '';
  height: 0;
}
.no-line:after{
  content:'';
  height: 0;
  border: none;
}
.drive-wrap{
  background: #fff;
  margin-top: 10px;
}
.drive-wrap ul{
  padding-top: 15px;
}
.drive-wrap li{
  padding: 0 10px 12px;
}
.drive-wrap >header{
  height: 44px;
  line-height: 44px;
  padding: 0 5px 0 15px;
  font-size: 16px;
  color: #222;
  position: relative;
}
.drive-wrap >header::after{
  content: " ";
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 1px;
    border-bottom: 1px solid #e5e5e5;
    color: #D9D9D9;
    -webkit-transform-origin: 0 100%;
    transform-origin: 0 100%;
    -webkit-transform: scaleY(0.5);
    transform: scaleY(0.5);
}
.drive-wrap .to-add{
  float: right;
  background: #FF6600;
  border-radius: 4px;
  width: 71px;
  height: 34px;
  text-align: center;
  margin-top: 5px;
  line-height: 34px;
  color: #fff;
}
.drive-wrap .to-add:before{
  font-family: "shoper";
  content: '\e6b8'
}
.drive-wrap .list-end{
  line-height: 50px;
  padding: 0;
  text-align: center;
  background: #F5F5F5;
  line-height: 50px;
  font-size: 12px;
  color: #999999;
}
.datas-null{
  height: 100%;
  align-items: center;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #fff;
}
</style>
