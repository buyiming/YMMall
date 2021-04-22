<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <home-swiper :banners="banner"></home-swiper>
  </div>
</template>

<script>

import NavBar from "components/common/navbar/NavBar";
import HomeSwiper from "./homeComps/HomeSwiper";
import {getHomeMultidata} from "network/home";



export default {
  name: "Home",
  components: {
    HomeSwiper,
    NavBar
  },
  data(){
    return{
      banner:[],
      recommend:[],
    }
  },
  created() {
    //请求主页数据
    getHomeMultidata().then(res => {
      console.log(res);
      this.banner = res.data.banner.list;
      this.recommend = res.data.recommend.list;
    })
  }
}
</script>

<style scoped>
  .home-nav{
    background-color: var(--color-tint);
    color: #fff;
  }
</style>