<template>
  <div class="product-detail">
    <detail-nav-bar class="detail-nav-bar" @titleClick="titleClick" ref="detailnav"></detail-nav-bar>
    <scroll :probeType="3" ref="scroll" class="content" @scroll="contentScroll">
      <detail-swiper :topimg="topImages"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shops"></detail-shop-info>
      <detail-images-info @imgLoad="imgLoad" :imagesInfo="images"></detail-images-info>
      <detail-param-info ref="params" :detailParams="goodsParams"></detail-param-info>
      <detail-comment-info ref="comment" :commentsInfo="comments"></detail-comment-info>
      <goods-list ref="recommond" :goodsList="recommondList" :flag="1" class="goodslist"></goods-list>
    </scroll>
    <back-top @click.native="backClick" v-show="isShow"/>
    <detail-bottom-bar @addCart="addToCart"></detail-bottom-bar>
  </div>
</template>

<script>

import DetailNavBar from "./childComps/DetailNavBar";
import DetailSwiper from "./childComps/DetailSwiper";
import DetailBaseInfo from "./childComps/DetailBaseInfo";
import DetailShopInfo from "./childComps/DetailShopInfo";
import DetailImagesInfo from "./childComps/DetailImagesInfo";
import DetailParamInfo from "./childComps/DetailParamInfo";
import DetailCommentInfo from "./childComps/DetailCommentInfo";
import DetailBottomBar from "./childComps/DetailBottomBar";
import GoodsList from "components/content/goods/GoodsList";
import BackTop from "components/content/backTop/BackTop";
import Scroll from "components/common/scroll/Scroll";

import {getDetail,getRecommond,Goods,Shop,GoodsParams} from "network/detail";

export default {
  name: "Detail",
  data(){
    return{
      iid:null,
      topImages:[],
      goods:{},
      shops:{},
      images:{},
      goodsParams:{},
      comments:{},
      recommondList:[],
      //返回顶部按钮是否显示
      isShow:false,
      themeTopys:[],
      currentIndex:0,
    }
  },
  created() {
    //获取商品id
    this.iid = this.$route.query.iid;
    //发送网络请求获取商品数据
    getDetail(this.iid).then(res => {
      const data = res.result;
      //获取顶部轮播图数据
      this.topImages = data.itemInfo.topImages;

      //获取商品数据
      this.goods = new Goods(data.itemInfo,data.columns,data.shopInfo.services);

      //获取店铺信息
      this.shops = new Shop(data.shopInfo)

      //获取详情图片列表对象
      this.images = data.detailInfo

      //获取尺寸数据
      this.goodsParams = new GoodsParams(data.itemParams.info,data.itemParams.rule || {})

      //获取评论信息
      if(data.rate.cRate !== 0){
        this.comments = data.rate.list[0] || {};
      }
    });
    //请求相关数据
    getRecommond().then(res => {
      this.recommondList = res.data.list;
    })
  },
  methods:{
    //scroll组件滚动
    contentScroll(position){
      //是否显示backTop组件
      this.isShow = position.y < -1000;

      //1.获取屏幕滚动Y值
      const positionY = -position.y;
      //2.和themeTopys 数组中的值比较
      let length = this.themeTopys.length;
      for (let i=0;i<length;i++) {
        if ((i < length - 1 && positionY >= this.themeTopys[i] && positionY < this.themeTopys[i + 1]) || (i == length - 1 && positionY >= this.themeTopys[i])){
          this.currentIndex = i;
          this.$refs.detailnav.currentIndex = this.currentIndex;
        }
      }
    },
    //返回顶部按钮点击
    backClick(){
      this.$refs.scroll.scrollTo(0,0)
    },
    //顶部导航按钮点击
    titleClick(index){
      this.$refs.scroll.scrollTo(0,-this.themeTopys[index],300);
    },
    //推荐图片加载完
    imgLoad(){
      this.$refs.scroll.refresh();
      this.$nextTick(() => {
        this.themeTopys = [];
        this.themeTopys.push(0);
        this.themeTopys.push(this.$refs.params.$el.offsetTop);
        this.themeTopys.push(this.$refs.comment.$el.offsetTop);
        this.themeTopys.push(this.$refs.recommond.$el.offsetTop);
      })
    },
    //添加到购物车
    addToCart(){
      //1.获取商品信息
      const product = {};
      product.image = this.topImages[0];
      product.title = this.goods.title;
      product.desc = this.goods.desc;
      product.price = this.goods.nowPrice;
      product.iid = this.iid;
      product.checked = false;

      //2.将商品放入购物车
      this.$store.dispatch('addCart',product);
    }
  },
  components:{
    DetailSwiper,
    DetailNavBar,
    DetailBaseInfo,
    DetailShopInfo,
    DetailImagesInfo,
    DetailParamInfo,
    DetailCommentInfo,
    DetailBottomBar,
    GoodsList,
    BackTop,
    Scroll,
  }
}
</script>

<style scoped>
  .product-detail{
    height: 100vh;
    background-color: #fff;
    position: relative;
    z-index: 1;
  }
  .content{
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
    overflow: hidden;
    width: 100%;
    background-color: #fff;
  }
  .detail-nav-bar{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 9;
    background-color: #fff;
  }
  .goodslist{
    margin-top: 5px;
  }
</style>