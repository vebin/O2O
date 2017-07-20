<template>
   <div class="cells">
    <label class="cell-title">地址</label>
    <i class="location"></i>
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
.cell-input{
  position: relative;
  padding: 5px 0;
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
