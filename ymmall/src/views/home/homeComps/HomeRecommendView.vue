<template>
  <div id="recommond">
    <div v-for="item in recommends" class="recommand-item">
      <a :href="item.link">
        <img :src="item.image">
        <div class="recommand-title"><span>{{item.title}}</span></div>
      </a>
    </div>

  </div>
</template>

<script>
export default {
  name: "HomeRecommendView",
  props:{
    recommends:{
      type:Array,
      default(){
        return []
      }
    }
  }
}
</script>

<style scoped>
  #recommond{
    display: flex;
    text-align: center;
    margin-top: 10px;
    padding-bottom: 15px;
    border-bottom: 8px solid #eee;
  }
  .recommand-item{
    flex: 1;
  }
  .recommand-item img{
    width: 65px;
    height: 65px;
  }
  .recommand-title span{
    font-size: 13px;
  }
</style>