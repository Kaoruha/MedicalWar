// BaseModule.js
import axios from 'axios';
import Router from '../router/index.js';
import { Notify } from 'quasar'
// const baseURL = 'http://0.0.0.0:5000/api';

class BaseModule {
  constructor(url, timeout) {
    this.url = url;
    this.timeout = timeout;
    this.instance = axios.create({
      baseURL: this.url,
      timeout: this.timeout,
      headers: {
        // 'Content-Type': 'multipart/form-data',
        'Content-Type': 'application/json;charset=UTF-8',
        'Authorization': localStorage.getItem('Authorization'),
      },
    })
    // this.instance.defaults.headers.common['Authorization'] = localStorage.getItem('Authorization')


    // 请求拦截
    this.instance.interceptors.request.use(
      config => {
        // console.log(config)
        // 更新token
        config.headers.Authorization = localStorage.getItem('Authorization')
        return config
      },
      error => {
        // console.log(error)
        return Promise.reject(error)
      }
    )
    // 响应拦截
    this.instance.interceptors.response.use(function (response) {
      // console.log('Interceptor=====')
      // console.log(response)
      // console.log('Interceptor=====')
      switch (response.data.code) {
        case 200:
          console.log('尝试获取信息')
          // Notify.create({
          //   message: "尝试获取信息",
          //   // 可用的值: 'positive', 'negative', 'warning', 'info'
          //   type: "info",
          //   textColor: "white",
          //   // 'top', 'left', 'bottom-left'等
          //   position: "top",
          // })
          break
        // 异常处理
        case 403:

          console.log(response.data)
          window.router.push("/login")
          Notify.create({
            message: "权限不足，请登录后尝试",
            // 可用的值: 'positive', 'negative', 'warning', 'info'
            type: "negative",
            textColor: "white",
            // 'top', 'left', 'bottom-left'等
            position: "top",
          })
          // routes.push("/login")
          // Vue.Router.push("/login")
          // Router.push({ path:'/user'})
          break
        case 600:
          Notify.create({
            message: "表单信息错误",
            // 可用的值: 'positive', 'negative', 'warning', 'info'
            type: "negative",
            textColor: "white",
            // 'top', 'left', 'bottom-left'等
            position: "top",
          })
          break
        case 601:
          Notify.create({
            message: "用户名重复",
            // 可用的值: 'positive', 'negative', 'warning', 'info'
            type: "negative",
            textColor: "white",
            // 'top', 'left', 'bottom-left'等
            position: "top",
          })
          break
        case 602:
          Notify.create({
            message: "登录失败",
            // 可用的值: 'positive', 'negative', 'warning', 'info'
            type: "negative",
            textColor: "white",
            // 'top', 'left', 'bottom-left'等
            position: "top",
          })
          break
      }
      return response.data
    }, function (error) {
      // 对响应错误做点什么
      return Promise.reject(error)
    })
  }

  get(url, config = {}) {
    return this.instance.get(url, config)
  }

  post(url, data, config = {}) {
    return this.instance.post(url, data, config)
  }

  upload(url, data) {
    return this.instance.post(url, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      }
    })
  }

  put(url, data, config = {}) {
    return this.instance.put(url, data, config)
  }

  delete(url, config = {}) {
    return this.instance.delete(url, config)
  }
}


export default BaseModule
