import Vue from 'vue'
import Axios from 'axios'
import { HOST } from './config'

const vm = new Vue()

function errorLog (config) {
  // 打印到控制台
  if (process.env.NODE_ENV === 'development') {
    console.error('请求接口报错:', config.data)
  }
  if (config && config.data.message) {
    // 显示提示
    vm.$message.error(config.data.message)
  }
}

const api = Axios.create({
  baseURL: HOST || '/',
  withCredentials: true,
  timeout: 20000 // 20s
})

api.interceptors.request.use(
  (config) => {
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

api.interceptors.response.use(
  (response) => {
    const { data: res } = response
    const { code } = res || {}
    if (code === 0) {
      return res
    }
    if (code === 5) {
      vm.$message.error('接口无权限访问')
      return res
    }
    errorLog(res)
    return res
  },
  (error) => {
    if (error && error.response) {
      switch (error.response.status) {
        case 400:
          error.message = '请求错误'
          break
        case 401:
          error.message = '未授权，请登录'
          break
        case 403:
          error.message = '服务器拒绝访问'
          break
        case 404:
          error.message = `请求地址出错: ${error.response.config.url}`
          break
        case 408:
          error.message = '请求超时'
          break
        case 500:
          error.message = '服务器内部错误'
          break
        case 501:
          error.message = '服务未实现'
          break
        case 502:
          error.message = '网关错误'
          break
        case 503:
          error.message = '服务不可用'
          break
        case 504:
          error.message = '网关超时'
          break
        case 505:
          error.message = 'HTTP版本不受支持'
          break
        default:
          break
      }
    }
    // 前端超时提示
    if (error && error.code === 'ECONNABORTED') {
      error.message = '请求超时，当前网络不佳，请稍后重试'
    }
    if (error && error.message) {
      vm.$message.error(error.message)
    }
    return Promise.reject(error)
  }
)

export default api
