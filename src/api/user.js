import request from '@/util/request'
import qs from 'qs';

export function getUserList (obj) {
  console.log(qs.stringify(obj));
  return request({
    url: '/api/v1/user/page',
    method: 'get',
    data: obj
  })
}
export function addUser (obj) {
  return request({
    url: '/api/v1/user',
    method: 'PUT',
    data: obj
  })
}
export function editUser (obj) {
  return request({
    url: '/api/v1/user',
    method: 'PUT',
    data: obj
  })
}
