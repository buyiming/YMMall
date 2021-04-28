<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>

import BScroll from '@better-scroll/core'
import ObserveDOM from '@better-scroll/observe-dom'
import PullUp from '@better-scroll/pull-up'

BScroll.use(ObserveDOM);
BScroll.use(PullUp);

export default {
  name: "Scroll",
  props:{
    probeType:{
      type:Number,
      default:0,
    },
    pullUpload:{
      type:Boolean,
      default: false,
    }
  },
  data(){
    return{
      scroll:null
    }
  },
  mounted() {
    //创建betterscroll组件
    this.scroll = new BScroll(this.$refs.wrapper,{
      click:true,
      observeDOM:true,
      probeType:this.probeType,
      pullUpLoad: this.pullUpload,
    });
    //监听滚动事件
    this.scroll.on('scroll',(position) => {
      this.$emit('scroll',position);
    });
    //监听上拉事件
    this.scroll.on('pullingUp',() => {
      this.$emit('pullingUp')
    })
  },
  methods:{
    scrollTo(x,y,time=500){
      this.scroll && this.scroll.scrollTo(x,y,time);
    },
    refresh(){
      this.scroll && this.scroll.refresh();
    },
    finishPullUp(){
      this.scroll && this.scroll.finishPullUp();
    }
  }
}
</script>

<style scoped>

</style>