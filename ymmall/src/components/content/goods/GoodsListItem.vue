<template>
  <div class="goods-item" @click="itemClick">
    <img v-lazy="showImage()" @load="imageLoad">
    <div class="goods-info">
      <p>{{goods.title}}</p>
      <span class="price">{{goods.price}}</span>
      <span class="collect">{{goods.cfav}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "GoodsListItem",
  props:{
    goods:{
      type:Object,
      default(){
        return {}
      }
    },
    flag:{
      type:Number,
      default(){
        return 0;
      }
    }
  },
  methods:{
    imageLoad(){
      this.$bus.$emit('itemImageLoad')
    },
    showImage(){
      if(this.flag === 1){
        return this.goods.image;
      }else if(this.flag == 2){
        return this.goods.img;
      }else{
        return this.goods.show.img;
      }
    },
    itemClick(){
      this.$router.push({
        path:'/detail',
        query:{
          iid:this.goods.iid
        }
      })
    }
  }
}
</script>

<style scoped>
  .goods-item{
    margin-bottom: 10px;
    padding-bottom: 40px;
    position: relative;
    width: 48%;
    box-shadow: 3px 3px 3px rgba(192,192,192,0.3);
    border-radius: 5px;
  }
  .goods-item img{
    width: 100%;
    border-radius: 5px;
  }
  .goods-info{
    font-size: 12px;
    position: absolute;
    bottom: 5px;
    left: 0;
    right: 0;
    overflow: hidden;
    text-align: center;
  }
  .goods-info p{
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-bottom: 3px;
  }
  .goods-info .price{
    color: var(--color-high-text);
    margin-right: 20px;
  }
  .goods-info .collect{
    position: relative;
  }
  .goods-info .collect::before{
    content: '';
    position: absolute;
    left: -15px;
    top: -1px;
    width: 14px;
    height: 14px;
    background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
  }
</style>