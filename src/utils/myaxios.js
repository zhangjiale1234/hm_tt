import axios from 'axios'
axios.defaults.baseURL = 'http://127.0.0.1:3000'
const baseU = 'http://127.0.0.1:3000'
localStorage.setItem('baseUrl', baseU)

export default axios

// 请求拦截
// 添加请求拦截器:每一个请求都会经过
axios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么:将token以请求头的方式传递给服务器，服务器可以根据当前的token进行处理
  const token = localStorage.getItem('loginToken')
  if (token) {
    console.log('已经带上请求头')
    config.headers.Authorization = token
  }
  // 请求并不是拦截器来发送的，它只是发送过程中的一个插曲
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})
