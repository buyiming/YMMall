import {
    ADD_COUNT,
    ADD_CART
} from "./mutations-types";
export default {
    [ADD_CART](context,payload){
        //判断传进来的商品是否重复，重复count +1 ，不重复添加在数组
        let oldProduct = context.state.cartList.find(item => item.iid === payload.iid)
        if (oldProduct){
            // oldProduct.count += 1;
            context.commit(ADD_COUNT,oldProduct);
        }else{
            payload.count = 1;
            context.commit(ADD_CART,payload);
        }
    }
}