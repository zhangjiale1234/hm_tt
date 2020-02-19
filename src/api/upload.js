import axios from '@/utils/myaxios'

export const upLoadFile = (data) => {
  return axios({
    url: '/upload',
    method: 'post',
    data
  })
}
