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
// 栏目列表
export const getCategoryList = (params) => {
  return axios({
    url: '/category',
    params
  })
}
// 获取文章数据
export const getPostsList = (params) => {
  return axios({
    url: '/post',
    params
  })
}
// 获取文章详情
export const getPostData = (id) => {
  return axios({
    url: `/post/${id}`
  })
}
// 点赞
export const clickLike = (id) => {
  return axios({
    url: `/post_like/${id}`
  })
}
// 关注用户
export const followUser = (id) => {
  return axios({
    url: `/user_follows/${id}`
  })
}
