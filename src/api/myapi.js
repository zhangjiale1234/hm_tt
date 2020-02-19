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

// 获取用户信息
export const getUserInfo = (id, token) => {
  return axios({
    url: `/user/${id}`,
    headers: {
      Authorization: token
    }
  })
}
// 修改用户信息
export const updataUserInfo = (id, data) => {
  return axios({
    method: 'post',
    url: `/user_update/${id}`,
    data
  })
}
