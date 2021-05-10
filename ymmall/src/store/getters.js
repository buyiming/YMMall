export default {
    cartLength(state){
        return state.cartList.length;
    },
    cartList(state){
        return state.cartList;
    },
    //映射加载请求
    isLoading: state => state.isLoading
}