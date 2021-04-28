<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <tab-control
        class="tabControl"
        :titles="['流行','新款','精选']"
        @tabClick="tabClick"
        v-show="isTopTabControlShow"
        ref="tabcontrolTop">
    </tab-control>
    <scroll class="content" ref="scroll" :probe-type="3" :pullUpload="true" @scroll="contentScroll" @pullingUp="loadMore">
      <home-swiper :banners="banner" @swiperImageLoad="swiperImageLoad"></home-swiper>
      <home-recommend-view :recommends="recommend"></home-recommend-view>
      <home-feature-view></home-feature-view>
      <tab-control :titles="['流行','新款','精选']" @tabClick="tabClick" ref="tabcontrolBottom"></tab-control>
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
      tabOffsetTop:0,
      //顶部吸顶tabcontrol显示
      isTopTabControlShow:false,
    }
  },
  computed:{
    showGoods(){
      return this.goods[this.currentType].list
    }
  },
  created() {
    //请求主页数据
    this.getHomeMultidata();
    //请求分栏数据
    this.getHomeGoods('pop');
    this.getHomeGoods('new');
    this.getHomeGoods('sell');

  },
  mounted() {
    const refresh = this.debonce(this.$refs.scroll.refresh,200)
    //监听图片加载完成
    this.$bus.$on('itemImageLoad', () => {
      refresh();
    })
  },
  methods:{
    /***
     * 事件监听相关方法
     */

    //轮播图 图片加载完成
    swiperImageLoad(){
      this.tabOffsetTop = this.$refs.tabcontrolBottom.$el.offsetTop;
    },

    //防抖函数 图片加载完成
    debonce(func,delay){
      let timer = null;
      return function (...args) {
        if(timer) clearTimeout(timer);
        timer = setTimeout(() => {
          func.apply(this,args);
        },delay)
      }
    },

    //切换tabbar
    tabClick(index){
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
      this.$refs.tabcontrolTop.currentIndex = index;
      this.$refs.tabcontrolBottom.currentIndex = index;
    },
    //返回顶部按钮点击
    backClick(){
      this.$refs.scroll.scrollTo(0,0)
    },
    //滚动事件
    contentScroll(position){
      this.isShow = position.y < -1000;

      //tabControl是否吸顶
      this.isTopTabControlShow = position.y < -this.tabOffsetTop;
    },
    //上拉加载更多
    loadMore(){
      //针对当前类型，加载更多数据
      this.getHomeGoods(this.currentType);
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
        this.$refs.scroll.finishPullUp();
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
  .content{
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }
  .tabControl{
    position: fixed;
    z-index: 11;
    top: 44px;
    left: 0;
    right: 0;
  }
</style>