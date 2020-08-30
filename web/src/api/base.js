// BaseModule.js
import axios from 'axios'
import routes from '../router/index.js'

class BaseModule {
  constructor(url, timeout) {
    this.url = url
    this.timeout = timeout
    this.instance = axios.create({
      baseURL: this.url,
      timeout: this.timeout,
      headers: {
        // 'Content-Type': 'multipart/form-data',
        'Content-Type': 'application/json;charset=UTF-8',
        'Authorization': localStorage.getItem('Authorization')
      }
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
          console.log('信息获取成功')
          break
        // 异常处理
        case 403:
          console.log('权限不足,权限不足')
          routes.push("/login")
          break
        case 600:
          console.log('表单信息错误')
          break
        case 601:
          console.log('用户名重复')
          break
        case 602:
          console.log('登录失败')
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
