import axios from "axios";
import {Toast} from "vant";
import Loading from "../store/index"

export function request(config){
    const instance = axios.create({
        // baseURL: 'http://123.207.32.32:8000',
        baseURL:'http://152.136.185.210:7878/api/m5',
        timeout: 5000
    })

    instance.interceptors.request.use(config => {
        if(Loading.getters.isLoading){
            Toast.loading({
                forbidClick:true,
                message:"加载中..."
            });
        }
        return config
    }), err => {

    }

    instance.interceptors.response.use(res => {

        return res.data
    }), err => {
        console.log(err);
    }
    return instance(config)
}