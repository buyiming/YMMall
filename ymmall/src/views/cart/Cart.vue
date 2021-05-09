<template>
  <div class="cart">
    <!-- 导航 -->
    <nav-bar class="nav-bar">
      <div slot="center">
        购物车(<span>{{cartLength}}</span>)
      </div>
    </nav-bar>
    <!-- 列表 -->
    <cart-list></cart-list>
    <!-- 底部汇总 -->
  </div>
</template>

<script>

import NavBar from "@/components/common/navbar/NavBar";
import CartList from "./childComps/CartList";
import {mapGetters} from "vuex";

export default {
  name: "Cart",
  components:{
    NavBar,
    CartList,
  },
  computed:{
    ...mapGetters(['cartLength'])
  }
}
</script>

<style scoped>
  .nav-bar {
    font-weight: 500;
    color: white;
    background-color: #ff8198;
  }
</style>