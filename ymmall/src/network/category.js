import {request} from "./request";

//分类左边栏数据
export function getCategory(){
    return request({
        url:'/category',
    })
}

//分类右边栏数据
export function getSubcategory(maitKey){
    return request({
        url:'/subcategory',
        params:{
            maitKey
        }
    })
}

//分类详情数据
export function getCategoryDetail(miniWallkey, type){
    return request({
        url:'/subcategory/detail',
        params:{
            miniWallkey,
            type
        }
    })
}
