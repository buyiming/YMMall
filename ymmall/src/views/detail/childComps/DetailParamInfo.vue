<template>
  <div class="param-info" v-if="Object.keys(detailParams).length !== 0">
    <p>参数信息</p>
    <table :key="index" class="info-size" v-for="(table,index) in detailParams.sizes">
      <tr :key="indexy" v-for="(tr,indexy) in table">
        <td :key="indexx" v-for="(td,indexx) in tr">{{td}}</td>
      </tr>
    </table>

    <table class="info-param">
      <tr :key="index" v-for="(info,index) in detailParams.infos">
        <td class="info-param-key">{{info.key}}</td>
        <td class="param-value">{{info.value}}</td>
      </tr>
    </table>
    <div class="info-img" v-if="detailParams.image.length !== 0">
      <img :src="detailParams.image"/>
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailParamInfo",
  props:{
    detailParams:{
      type:Object,
      default(){
        return {};
      }
    }
  }
}
</script>

<style scoped>
  .param-info{
    font-size: 14px;
    padding: 20px 15px;
    border-bottom: 5px solid #f2f5f8;
  }
  .param-info p{
    font-size: 15px;
    margin-bottom: 10px;
  }
  .param-info table{
    width: 100%;
    border-collapse: collapse;
  }
  .param-info table tr{
    height: 42px;
  }
  .param-info table tr td{
    border-bottom: 1px solid rgba(100,100,100,0.1);
  }
  .info-param-key{
    width: 95px;
  }
  .info-param{
    border-top: 1px solid rgba(0,0,0,0.1);
  }
  .param-value{
    color: #eb4868;
  }
  .info-img img{
    width: 100%;
  }
</style>