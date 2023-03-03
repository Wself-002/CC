import axios from "axios";
import qs from "qs"; // qs数据序列化。post请求必须加
import { Toast } from "vant";
import router from "@/router";
const request = axios.create({
  timeout:3000
});
request.interceptors.request.use(
  function (config) {
    if(config.url == (process.env.VUE_APP_BASEAPI + '/api/cps/outer/login/pswd')){
      config.data = config.data + '&cid=2'
      return config;
    }else{
      const info = JSON.parse(localStorage.getItem("ccLogin") as any)
      config.data = config.data + `&cid=2&sid=${info.sid}`
      return config;
    }
  },
  function (error) {
    return Promise.reject(error);
  },
);
// 添加响应拦截器
request.interceptors.response.use(
  (response) => {
    // console.log('response: ', response);
    if(response.status == 200){
      if(response.data.code == '000000'){
        // // console.log("123")
        return response.data.data;
      }else if(response.data.code == "800302"){
        // // console.log("456")
        Toast.fail(response.data.msg);
        router.replace('/login')
      }else{
        // // console.log("789")
        Toast.fail(response.data.msg);
      }
    }else{
      Toast.fail('网络错误');
      return response;
    }
  },
  (error) => {
    // 当响应异常时做点什么
    if (!error.response) {
      return Promise.resolve(error);
    }
    // 返回错误码,自行定义,根据项目需求和实际情况
    switch (error.response.status) {
      case 401:
        break;
      case 403:
        break;
      case 404:
        break;
      default:
        return Promise.reject(error);
    }
    return Promise.reject(error);
  },
);
export default {
  /**
   * get
   * @param {String} url [请求的url地址]
   * @param {any} params [请求时携带的参数]
   */
  get(url: string) {
    return new Promise((resolve, reject) => {
      request
        .get(url)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  /**
   * post
   * @param {String} url [请求的url地址]
   * @param {any} params [请求时携带的参数]
   */
  post(url: string, params: any) {
    return new Promise((resolve, reject) => {
      request
        .post(url, params)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  /**
   * post + qs
   * @param {String} url [请求的url地址]
   * @param {any} params [请求时携带的参数]
   */
  qspost(url: string, params: any) {
    return new Promise((resolve, reject) => {
      request
        .post(url, qs.stringify(params))
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  /**
   * post + headers
   * @param {String} url [请求的url地址]
   * @param {any} params [请求时携带的参数]
   * @param {any} headers [请求时携带的headers]
   * @returns
   */
  postAndHeaders(url: string, params: any, headers: any) {
    return new Promise((resolve, reject) => {
      request
        .post(url, params, headers)
        .then((res) => {
          resolve(res);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
};
