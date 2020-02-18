import axios from '@/utils/myaxios.js'
// 注册
export const register = (data) => {
  return axios({
    url: '/register',
    method: 'post',
    data
  })
}

// 登录
export const login = (data) => {
  return axios({
    url: '/login',
    method: 'post',
    data
  })
}
