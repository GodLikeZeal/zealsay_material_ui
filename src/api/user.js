import request from '@/util/request'

export function getUserList() {
  return request({
    url: '/api/v1/user/page',
    method: 'get'
  })
}
export function addUser(obj){
  return request({
    url:'/api/v1/user',
    method:'PUT',
    data:obj
  })
}
export function editUser(obj){
  return request({
    url:'/api/v1/user',
    method:'PUT',
    data:obj
  })
}
