<template>
   <div class="cells">
    <label class="cell-title">地址</label>
    <span class="cell-input location">青白区货运大道易通汽修</span>
    <span class="cell-arrow"></span>
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  }
}
</script>

<style scoped>
.location:before{
	content:'\e693';
	color: #09BB07;
	font-size: 13px;
	margin-right: 5px;
	font-family: 'shoper'
}
</style>
