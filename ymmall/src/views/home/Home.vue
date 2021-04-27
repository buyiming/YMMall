<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <scroll class="content" ref="scroll" :probe-type="3" @scroll="contentScroll">
      <home-swiper :banners="banner"></home-swiper>
      <home-recommend-view :recommends="recommend"></home-recommend-view>
      <home-feature-view></home-feature-view>
      <tab-control class="tabControl" :titles="['流行','新款','精选']" @tabClick="tabClick"></tab-control>
      <goods-list :goodsList="showGoods "></goods-list>
    </scroll>
    <back-top @click.native="backClick" v-show="isShow"/>
  </div>
</template>

<script>

import NavBar from "components/common/navbar/NavBar";
import HomeSwiper from "./homeComps/HomeSwiper";
import HomeRecommendView from "./homeComps/HomeRecommendView";
import HomeFeatureView from "./homeComps/HomeFeatureView";
import GoodsList from "components/content/goods/GoodsList";
import TabControl from "components/content/tabControl/TabControl";
import Scroll from "components/common/scroll/Scroll";
import BackTop from "components/content/backTop/BackTop";

import {getHomeMultidata,getHomeGoods} from "network/home";



export default {
  name: "Home",
  components: {
    HomeSwiper,
    HomeRecommendView,
    HomeFeatureView,
    TabControl,
    GoodsList,
    NavBar,
    Scroll,
    BackTop,
  },
  data(){
    return{
      banner:[],
      recommend:[],
      goods:{
        'pop':{page:0,list:[]},
        'new':{page:0,list:[]},
        'sell':{page:0,list:[]}
      },
      currentType:'pop',
      //返回顶部按钮是否显示
      isShow:false,
    }
  },
  computed:{
    showGoods(){
      return this.goods[this.currentType].list
    }
  },
  created() {
    this.getHomeMultidata();
    this.getHomeGoods('pop');
    this.getHomeGoods('new');
    this.getHomeGoods('sell');
  },
  methods:{
    /***
     * 事件监听相关方法
     */
    tabClick(index){
      console.log('点击了',index);
      switch (index) {
        case 0:
          this.currentType = 'pop';
          break;
        case 1:
          this.currentType = 'new';
          break;
        case 2:
          this.currentType = 'sell';
          break
      }
    },
    //返回顶部按钮点击
    backClick(){
      console.log('backClick');
      this.$refs.scroll.scrollTo(0,0)
    },
    //滚动事件
    contentScroll(position){
      console.log(position.y);
      this.isShow = position.y < -1000
    },

    /**
     * 网络请求相关的方法
     */
    getHomeMultidata(){
      //请求主页数据
      getHomeMultidata().then(res => {
        this.banner = res.data.banner.list;
        this.recommend = res.data.recommend.list;
      })
    },
    getHomeGoods(type){
      const page = this.goods[type].page + 1;
      getHomeGoods(type,page).then(res => {
        this.goods[type].list.push(...res.data.list);
        this.goods[type].page = page;
      })
    }
  }
}
</script>

<style scoped>
  #home{
    position: relative;
    padding-top: 44px;
    height: 100vh;
  }
  .home-nav{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 9;
    background-color: var(--color-tint);
    color: #fff;
  }
  .tabControl{
    z-index: 9;
    position: sticky;
    top: 44px;
  }
  .content{
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }

</style>