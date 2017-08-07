<template lang="html">
  <div class="wraper">
    <div class="form-wraper">
      <business @subShowToast="subShowToast"></business>
    </div>
    <div class="main-business">
      <div class="business-item" v-for="(item, index) in businessList">
        <business-list @remove="remove" :index="index" :business="item"></business-list>
      </div>
    </div>
    <business-null v-if="showNull"></business-null>

    <confirm @confirm="confirm" :msg="confirmMsg" v-if="showConfirm"></confirm>
    <toast :msg="toast" v-if="toastState"></toast>
  </div>
</template>

<script>
import storage from '../store/storage.js'
import { mapGetters, mapActions } from 'vuex'
import Toast from '../components/global/toast.vue'
import Confirm from '../components/global/confirm.vue'
import Business from '../components/main-business/business.vue'
import BusinessList from '../components/main-business/business-list.vue'
import BusinessNull from '../components/main-business/business-null.vue'
import XHR from '../api/index.js'
export default {
  components: {Business, BusinessList, BusinessNull, Confirm, Toast},
  data () {
    return {
      shopId: this.$route.params.shopid,
      businessList: [],
      showNull: false,
      confirmMsg: '确认删除该信息吗？<br/>删除后，不可恢复哦～',
      showConfirm: false,
      deleteIndex: 0,
      uid:''
    }
  },
  created () {
    this.setMainBusinessInfo()
    let joinInfo = storage.get('data')
    this.uid = JSON.parse(joinInfo).bbsid
  },
  mounted () {
    this.settitle()
  },
  computed: {
    ...mapGetters(['toastState'])
  },
  methods: {
    ...mapActions(['toggleToast']),
    showToast (msg) {
      this.toast = msg
      this.toggleToast()
    },
    subShowToast (msg) {
      this.showToast(msg)
    },
    settitle () {     // 设置标题
      if (this.setApp()==='other') {
        window.document.title = '添加主营业务'
        this.hideshare()
      } else {
        this.callNativeMethod("onChangeWebTitle",{changeWebTitle:'添加主营业务'})
      }
    },
    remove (index) {
      this.deleteIndex = index
      this.showConfirm = true
    },
    confirm (type) {
      if (type === 'delete') {
        this.deleteMainBusiness(this.deleteIndex)
      }
      this.showConfirm = false
    },
    deleteMainBusiness () {
      let params = {
        shopId: this.shopId,
        businessId: this.businessList[this.deleteIndex].businessId
      }
      XHR.deleteMainBusiness(params).then(res => {
        let data = res.data
        if (data.status === 1) {
          // 删除成功
          this.showToast('删除成功')
          this.businessList.splice(this.deleteIndex, 1)
          this.checkBusiness()
        } else {
          // 删除失败
          this.showToast('删除失败')
        }
      }, err => {
        console.log(err)
      })
    },
    setMainBusinessInfo () {
      XHR.getShoperInfo({
        shopid: this.shopId,
        bbsid: this.uid
      }).then(res => {
        let data = res.data
        // 已审核商家 才有bussiness字段
        if (data.auditstate === '1') {
          this.businessList = data.business
        }
        this.checkBusiness()
      }, err => {
        console.log(err)
      })
    },
    checkBusiness () {
      // 没有业务显示没有业务组件
      if (this.businessList.length === 0) {
        this.showNull = true
      }
    }
  }
}
</script>

<style lang="css" scoped>
  .wraper {
    min-height: 100%;
    -webkit-overflow-scrolling: touch;
    overflow: scroll;
    background: #fff;
  }
  .form-wraper {
    border-bottom: 10px solid #F5F5F5;
  }
  .main-business {
    padding: 12px 10px 0;
  }
  .main-business .business-item {
    position: relative;
    width: 100%;
    height: 80px;
    margin-bottom: 12px;
    box-sizing: border-box;
   
  }
 
</style>
