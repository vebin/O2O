<template>
  <div class="location">
    <div class="map">
    </div>
    <div class="marker-wrap">
      <i>拖动地图到正确位置，并点击提交</i>
      <span class="marker">&#xe693;</span>
    </div>
    <div class="footer">
      <span class="address">朝阳区朝阳区建国路兴隆家园</span>
      <span class="submit">提交</span>
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
  .location{
    display: flex;
    position: relative;
    flex-direction: column;
    overflow: hidden;
    flex:1;
  }
  .map{
    flex:1;
    position: relative;
    background: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .marker-wrap{
    position: fixed;
    bottom: 45px;
    width: 100%;
    left: 0;
    top:0;
    z-index: 100;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column
  }
  .marker{
    font-family: 'shoper';
    color: #FD4C29;
    font-size: 26px;
    margin-top: 5px;
  }
  .marker-wrap i{
    opacity: 0.9;
    background: rgba(51,51,51,0.90);
    border-radius: 5px 5px 5px 0 1px 0 5px;
    padding: 10px 20px;
    color: #fff;
    font-size: 14px;
    border-radius: 5px;
    position: relative;
  }
  .marker-wrap i:after{
    width: 0;
    height: 0;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-top: 8px solid rgba(51,51,51,0.80);
    content: '';
    display: block;
    position: absolute;
    left: 50%;
    margin-left: -4px;
    bottom: -5px;
  }
  .footer{
    height: 45px;
    background: rgba(248,248,248,0.95);
    box-shadow: 0 0 0 0 #B2B2B2;
    display: flex;justify-content: center;align-items: center;
    flex-direction: row;
    border-top: 1px solid #f5f5f5;
  }
  .address{flex: 1;padding: 10px 15px;font-size: 16px;}
  .submit{
    background: #09BB07;
    width: 100px;
    height: 45px;
    text-align: center;
    font-size: 16px;
    line-height: 45px;
    color: #fff;
  }
</style>
