<template>
  <div class="bottom-bar">
    <van-goods-action>
      <van-goods-action-icon icon="chat-o" text="客服" />
      <van-goods-action-icon
          :info="cartLength"
          @click="$router.push('/cart')"
          icon="cart-o"
          text="购物车"
      />
      <van-goods-action-icon
          :color="isShouCang ? '#ff5000' : '#000000'"
          :icon="isShouCang ? 'star' : 'star-o'"
          :text="isShouCang ? '已收藏' : '收藏'"
          @click="starClick"
      />
      <van-goods-action-button @click="addToCart" text="加入购物车" type="warning" />
      <van-goods-action-button @click="$router.push('/cart')" text="立即购买" type="danger" />
    </van-goods-action>
  </div>
</template>

<script>
export default {
  name: "DetailBottomBar",
  data(){
    return{
      isShouCang:false
    }
  },
  methods:{
    //点击收藏
    starClick(){
      console.log('点击收藏');
      if(!this.isShouCang){
        this.$toast("收藏成功")
        this.isShouCang = true;
      }else {
        this.$toast("已取消收藏")
        this.isShouCang = false;
      }
    },
    //点击添加购物车
    addToCart(){

    }
  }
}
</script>

<style scoped>
  .bottom-bar {
    position: fixed;
    z-index: 10;
    right: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 50px;
  }

  /deep/ .van-goods-action {
    line-height: 50px;
    height: 50px;
    border-top: 1px solid #cccccc;
  }

  /deep/ .van-goods-action-icon {
    height: auto;
  }
</style>