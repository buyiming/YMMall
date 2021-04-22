<template>
  <div class="tabbar-item" @click="itemClick">
    <div v-if="!isActive"><slot name="item-icon"></slot></div>
    <div v-else><slot name="item-icon-active"></slot></div>
    <div :style="activeStyle" class="tabbar-title">
      <slot name="item-title"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "TabbarItem",
  props:{
    path:String,
    activeColor:{
      type:String,
      default:'#d4237a'
    }
  },
  computed:{
    isActive(){
      return this.$route.path == this.path
    },
    activeStyle(){
      return this.isActive ? {color:this.activeColor} : {}
    }
  },
  methods:{
    itemClick(){
      this.$router.replace(this.path)
    }
  }
}
</script>

<style scoped>
  .tabbar-item{
    flex: 1;
    text-align: center;
    height: 49px;
  }
  .tabbar-item img{
    margin-top: 3px;
    width: 20px;
    height: 20px;
  }

</style>