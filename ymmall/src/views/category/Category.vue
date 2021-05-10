<template>
  <div class="category">
    <nav-bar class="category-nav-bar">
      <div slot="center">商品分类</div>
    </nav-bar>
    <slide-bar :sliderBarList="categoryList" @slideItemClick="slideBarItemClick"></slide-bar>
    <scroll class="scroll-height" ref="scroll" @scroll="contentScroll" :probe-type="3">
      <subcategory :CategoryList="subcategoryList"></subcategory>
      <tab-control :titles="titleList" @tabClick="tabClick" ref="tabControl"></tab-control>
      <goods-list :goodsList="categoryDetailList" :flag="2" ></goods-list>
    </scroll>
    <back-top @click.native="backTopClick" v-show="isShow"></back-top>
  </div>
</template>

<script>

import NavBar from "@/components/common/navbar/NavBar";
import SlideBar from "./CategoryComps/SlideBar";
import Subcategory from "./CategoryComps/Subcategory";
import TabControl from "@/components/content/tabControl/TabControl";
import BackTop from "@/components/content/backTop/BackTop";
import {getCategory,getSubcategory,getCategoryDetail} from "@/network/category"
import Scroll from "@/components/common/scroll/Scroll";
import GoodsList from "../../components/content/goods/GoodsList";

export default {
  name: "Category",
  data(){
    return {
      //分类左边栏数据
      categoryList: [],
      //分类右边栏数据
      subcategoryList: [],
      //分类详情栏数据
      categoryDetailList: [],
      titleList: ["流行", "新款", "精选"],
      currentIndex: 0,
      //是否显示返回顶部按钮
      isShow:false,
    }
  },
  components:{
    GoodsList,
    TabControl,
    Scroll,
    NavBar,
    SlideBar,
    BackTop,
    Subcategory,
  },
  methods:{
    //获取分类左边栏数据
    getCategory(){
      getCategory().then(res => {
        this.categoryList = res.data.category.list;
        this.$nextTick(() => {
          this.getSubcategory(this.categoryList[0].maitKey);
          this.getCategoryDetail(this.categoryList[0].miniWallkey,'pop');
        })
      })
    },
    //获取分类右边栏数据
    getSubcategory(maitKey){
      getSubcategory(maitKey).then(res => {
        this.subcategoryList = [...res.data.list];
      })
    },
    //获取分类详情栏数据
    getCategoryDetail(key, type){
      getCategoryDetail(key, type).then(res => {
        this.categoryDetailList = res;
      })
    },

    slideBarItemClick({maitKey,index}){

      if(this.currentIndex === index) return;
      this.currentIndex = index;

      this.$refs.scroll.scrollTo(0,0,100);

      this.getSubcategory(maitKey);
      //根据点击的类型，发送请求
      this.getCategoryDetail(this.categoryList[this.currentIndex].miniWallkey,'pop')
    },
    tabClick(index){
      const typeList = ['pop','new','sell'];
      //切换类型
      this.getCategoryDetail(this.categoryList[this.currentIndex].miniWallkey, typeList[index]);
    },
    //监听scroll滚动
    contentScroll(position){
      this.isShow = position.y < -300;
    },
    //返回顶部按钮点击
    backTopClick(){
      this.$refs.scroll.scrollTo(0,0)
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
  },
  created() {
    this.getCategory();
  },
  mounted() {
    const refresh = this.debonce(this.$refs.scroll.refresh,200)
    //监听图片加载完成
    this.$bus.$on('itemImageLoad', () => {
      refresh();
    })
  },
}
</script>

<style scoped>
  .category-nav-bar{
    font-weight: 500;
    color: white;
    background-color: #ff8198;
  }
  .scroll-height {
    position: fixed;
    top: 44px;
    right: 0;
    bottom: 50px;
    left: 100px;
    overflow: hidden;
  }
</style>