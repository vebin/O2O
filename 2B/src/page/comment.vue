<template>
<div class="wraper" @touchmove.stop.prevent>
  <h3>快速评价</h3>
  <ul class="tags">
    <li :class="item.checked?'tag tag-active':'tag'" v-for="(item, index) in tags" @click="clickTag(item, index)">{{item.Title}}</li>
  </ul>
  <div class="commen-area">
    <textarea v-model="textarea" :maxlength="textareaMaxLength" placeholder="(选填)您对小店的服务感觉怎么样，还满意吗？"></textarea>
    <span>剩余{{textareaMaxLength-textarea.length}}字</span>
  </div>
  <div :class="textarea.length >= textareaMinLength || checkedTags.size ? 'submit-active submit' : 'submit'" @click="submit">提交</div>
  <toast :msg="toast" v-if="page.toast"></toast>
</div>
</template>

<script>
import { mapActions } from 'vuex'
import Toast from '../components/global/comment-toast.vue'
import XHR from '../api/index.js'
export default {
  components: {Toast},
  data () {
    return {
      toast: '',
      tags: [],
      checkedTags: new Set(),
      textarea: '',
      textareaState: false,
      textareaMaxLength: 50,
      textareaMinLength: 5,
      shopId: null,
      lock: true
    }
  },
  created () {
    this.shopId = this.$route.params.shopid
    this.setTags()
  },
  mounted () {
    this.settitle()
  },
  methods: {
    ...mapActions(['toggleToast']),
    setTags () {
      XHR.getCommentTags().then(res => {
        let data = [...res.data.data]
        if (res.data.status === 1) {
          data.forEach(item => {
            item.checked = false
          })
          this.tags = data
        }
      }, err => {
        console.log(err)
      })
    },
    settitle () {     // 设置标题
      if (this.setApp()==='other') {
        window.document.title = '快速评价'
        this.getWxconfig()
        this.hideshare()
      } else {
        this.callNativeMethod("onChangeWebTitle",{changeWebTitle:'快速评价'})
      }
    },
    clickTag (val, index) {
      this.tags[index].checked = !this.tags[index].checked
      if (this.checkedTags.has(val.Id)) {
        this.checkedTags.delete(val.Id)
      } else {
        this.checkedTags.add(val.Id)
      }
    },
    submit () {
      if (!this.lock) {
        return
      }
      if (this.textarea && this.textarea.length < 5) {
        this.showToast('您最少需要输入5个字')
        return
      }
      if (!(this.textarea.length >= this.textareaMinLength || this.checkedTags.size)) {
        return
      }
      XHR.submitComment({
        shopId: this.shopId,
        bbsid: this.$store.state.ShopData.bbsid,
        lables: [...this.checkedTags].join(','),
        info: this.textarea
      }).then(res => {
        let data = res.data
        if (data.status === 1) { // 评价成功
          this.showToast('评价成功')
          setTimeout(()=>{
            this.$router.go(-1)
          },3000)
        } else { // 评价失败
          this.showToast(data.msg)
        }
        this.lock = true
      }, err => {
        console.log(err)
        this.lock = true
      })
    },
    showToast (cont) {
      this.toast = cont
      this.toggleToast()
    }
  }
}
</script>

<style scoped>
  .wraper{
    height: 100%;
    box-sizing: border-box;
    padding: 15px;
    background: #fff;
  }
  textarea {
    outline: 0;
    resize: none;
    -webkit-appearance: none;
  }
  h3 {
    font-size: 16px;
    color: #222222;
    line-height: 24px;
    font-weight: bold;
  }
  .tags {
    font-size: 0;
    letter-spacing: 0;
  }
  .tags .tag {
    margin-right: 15px;
    margin-top: 15px;
    font-size: 14px !important;
    color: rgb(102, 102, 102);
    line-height: 30px;
    padding: 0 12px;
    border-radius: 20px;
    border: 1px solid rgb(229, 229, 229);
    display: inline-block;
  }
  .tags .tag-active {
    border-color: #FF6600;
    color: #fff;
    background: #FF6600;
    box-shadow: 0 2px 4px 0 rgba(255,102,0,0.30);
  }
  .commen-area {
    margin-top: 20px;
    position: relative;
  }
  .commen-area textarea {
    display: block;
    width: 100%;
    height: 180px;
    border: 1px solid #E5E5E5;
    border-radius: 4px;
    background: #FAFAFA;
    font-size: 16px;
    color: #333;
    line-height: 24px;
    padding: 10px;
    box-sizing: border-box;
  }
  .commen-area span {
    position: absolute;
    right: 10px;
    bottom: 10px;
    font-size: 14px;
    color: #999999;
    line-height: 22px;
  }
  .submit {
    margin-top: 30px;
    background-color: rgb(254, 194, 153);
    border-radius: 4px;
    font-size: 16px;
    color: #FFFFFF;
    letter-spacing: 0;
    line-height: 24px;
    text-align: center;
    line-height: 45px;
  }
  .submit-active {
    background: #FF6600;
  }
</style>
