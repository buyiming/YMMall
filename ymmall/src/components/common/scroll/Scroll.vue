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
BScroll.use(ObserveDOM)

export default {
  name: "Scroll",
  props:{
    probeType:{
      type:Number,
      default:0,
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
      observeDOM:true,
      probeType:this.probeType,
    })
    //监听滚动事件
    this.scroll.on('scroll',(position) => {
      this.$emit('scroll',position)
    })
  },
  methods:{
    scrollTo(x,y,time=500){
      this.scroll.scrollTo(x,y,time);
    }
  }
}
</script>

<style scoped>

</style>