import axios from 'axios'
import cloneDeep from 'lodash.clonedeep'
import store from '@/store'
import { createRequestToken } from '@/util/auth'


// const prifix = 'http://47.105.51.137:8090'
const prifix = 'https://api.zealsay.com'
// console.log(prifix)
const fetch = (options) => {
  let {
    method = 'get',
    data,
    url
  } = options

  url = prifix + url

  const cloneData = cloneDeep(data)
  let headers
  if (store.getters.token) {
    headers = { headers: { 'Authorization': createRequestToken() }}
  }
  switch (method.toLowerCase()) {
    case 'get':
      return axios.get(url, headers, {
        params: cloneData
      })
    case 'delete':
      return axios.delete(url, headers, {
        data: cloneData
      })
    case 'post':
      return axios.post(url, cloneData, headers)
    case 'put':
      return axios.put(url, cloneData, headers)
    case 'patch':
      return axios.patch(url, cloneData, headers)
    default:
      return axios(options)
  }
}

export default function request (options) {
  return fetch(options).then((response) => {
    const { statusText, status } = response
    const data = response.data
    if (data.code==='404'||data.code==='401') {
      // 跳转404路由
      this.$router.push({ path: `/error/${data.code}` })
      return
    }
    // if(data.code!=='200'){
    //   Message({
    //     message: data.message,
    //     type: 'error',
    //     duration: 5 * 1000
    //   })
    // }
    return Promise.resolve({
      success: true,
      statusCode: status,
      ...data
    })
  }).catch((error) => {
    const { response } = error
    let msg
    let statusCode
    if (response && response instanceof Object) {
      const { data, statusText } = response
      statusCode = response.status
      msg = data.message || statusText
    } else {
      statusCode = 600
      msg = error.message || 'Network Error'
    }
    return Promise.reject(new Error({ success: false, statusCode, message: msg }))
  })
}
