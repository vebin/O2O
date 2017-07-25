<template>
   <div class="cells">
    <label class="cell-icon"></label>
    <span class="cell-input">{{address}}</span>
    <span class="cell-arrow"></span>
  </div>
</template>

<script>
export default {
  props: ['address'],
  data () {
    return {
    }
  },
  methods: {
  }
}
</script>

<style scoped>
.cell-icon{
  background: url('https://s.kcimg.cn/wap/images/detail/o2oImg/map.png') 50% 50%;
  width: 22px;
  height: 44px;
  background-size: cover;
  margin-right: 10px;
  margin-left: 15px;
}
.cell-input{
  position: relative;
  padding: 5px 0;
  font-size: 16px;
}
.location:before{
	content:'\e693';
	color: #09BB07;
	font-size: 13px;
	margin-right: 5px;
  margin-left: 13px;
	font-family: 'shoper';
}
.cell-arrow:after{
  position: inherit;
}
</style>
