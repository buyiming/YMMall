<template>
  <div class="product-detail">
    <detail-nav-bar class="detail-nav-bar"></detail-nav-bar>
    <scroll :probeType="3" ref="scroll" class="content">
      <detail-swiper :topimg="topImages"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shops"></detail-shop-info>
      <detail-images-info :imagesInfo="images"></detail-images-info>
      <detail-param-info :detailParams="goodsParams"></detail-param-info>
      <detail-comment-info :commentsInfo="comments"></detail-comment-info>
      <goods-list :goodsList="recommondList" :flag="1" class="goodslist"></goods-list>
    </scroll>
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
import GoodsList from "components/content/goods/GoodsList";
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
      console.log(res);
      this.recommondList = res.data.list;
    })
  },
  components:{
    DetailSwiper,
    DetailNavBar,
    DetailBaseInfo,
    DetailShopInfo,
    DetailImagesInfo,
    DetailParamInfo,
    DetailCommentInfo,
    GoodsList,
    Scroll,
  }
}
</script>

<style scoped>
  .product-detail{
    width: 100%;
    height: 100%;
  }
  .content{
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
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