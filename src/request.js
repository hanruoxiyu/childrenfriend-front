import axois from 'axios'
import { Message } from 'element-ui'
import { getToken } from './utils/cookie'

// 创建axios实例
const service = axois.create({
  baseURL: 'http://127.0.0.1:8000/', // api 的 base_url
  timeout: 120000, // 请求超时时间
  changeOrigin: true,//是否允许跨越
})

// 请求拦截器设置
service.interceptors.request.use(
  config => {
    if (getToken()) {
      config.headers['Authorization'] = 'Bearer ' + getToken() // 请求头设置自带 token
    }
    config.headers['Content-Type'] = 'application/json' // 请求的数据格式为 json
    return config
  },
  // 请求错误
  error => {
    console.log(error)
    Promise.reject(error)
  }
)

// 响应拦截器设置
service.interceptors.response.use(
  response => {
    // data是 axios 返回数据中的 data
    const data = response.data
    // console.log(data)
      return data

  },
  error => {
    // 根据 code 判断页面状态
    const code = error.response.status

    console.log(code)
    if (code!=200) {
      Message({
        type: 'error',
        message: error.response.data.error
      })
    }
    return Promise.reject(error)
  }
)

export default service
