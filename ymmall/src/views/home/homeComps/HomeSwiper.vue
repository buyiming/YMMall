<template>
  <swiper>
    <swiper-item v-for="(item,id) in banners" :key="id">
      <a :href="item.link">
        <img :src="item.image" @load="swiperImageLoad">
      </a>
    </swiper-item>
  </swiper>
</template>

<script>

import Swiper from "components/common/swiper/Swiper";
import SwiperItem from "components/common/swiper/SwiperItem";

export default {
  name: "HomeSwiper",
  components: {SwiperItem, Swiper},
  props:{
    banners:{
      type:Array,
      default(){
        return []
      }
    }
  },
  data(){
    return{
      isFirst:true,
    }
  },
  methods:{
    swiperImageLoad(){
      if(this.isFirst){
        this.$emit('swiperImageLoad')
        this.isFirst = false;
      }
    }
  }
}
</script>

<style scoped>

</style>