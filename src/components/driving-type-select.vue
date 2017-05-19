<template>
  <div class="driving-type-select">
    <h2>驾照类型</h2>
    <div class="driving-tab">
      <label for=""><input type="radio" name="drive"><span>A1</span></label>
      <label for=""><input type="radio" name="drive"><span>A2</span></label>
      <label for=""><input type="radio" name="drive"><span>A3</span></label>
      <label for=""><input type="radio" name="drive"><span>B1</span></label>
      <label for=""><input type="radio" name="drive"><span>B2</span></label>
      <label for=""><input type="radio" name="drive"><span>C1</span></label>
      <label for=""><input type="radio" name="drive"><span>C3</span></label>
    </div>
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
.driving-type-select{
  padding: 10px 15px 0 15px;
  background: #fff;
  position: relative;
}
.driving-type-select >h2{
  font-size: 16px;
  color: #666666;
  line-height: 24px;
}
.driving-tab{
  padding: 12px 0;
  display: flex;
  flex-direction: row;
  width: 100%;
}
.driving-tab label{
  flex:1;margin-right: 10px;
  position: relative;
  height:30px
}
.driving-tab label input{
  position: absolute;
  left: 0;
  top:0;
  z-index: 5;
  width: 100%;
  height: 100%;
  opacity: 0;
  border:none;
}  
.driving-tab label span{
  border: 1px solid #E5E5E5;
  border-radius: 100px;
  background: #FFFFFF;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex:1;
  font-size: 14px;
  color: #666;
}
.driving-tab input[type="radio"]:checked + span{
  background: #09BB07;
  box-shadow: 0 2px 4px 0 rgba(9,187,7,0.30);
  color: #fff;
}
.driving-tab label:last-child{
  margin-right: 0;
}
.driving-type-select:after{
  content: " ";
  position: absolute;
  left: 15px;
  bottom: -1px;
  width: 100%;
  height: 1px;
  border-top: 1px solid #D9D9D9;
  color: #D9D9D9;
  -webkit-transform-origin: 0 0;
  transform-origin: 0 0;
  -webkit-transform: scaleY(0.5);
  transform: scaleY(0.5);
}
</style>
