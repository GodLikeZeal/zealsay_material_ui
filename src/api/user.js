import request from '@/util/request'
import qs from 'qs';

/**
 * 获取用户列表.
 *
 * @author  zhanglei
 * @date 2019-03-13  16:13
 */
export function getUserList (obj) {
  console.log(qs.stringify(obj));
  return request({
    url: '/api/v1/user/page',
    method: 'get',
    data: obj
  })
}
/**
 * 后台添加用户.
 *
 * @author  zhanglei
 * @date 2019-03-13  16:14
 */
export function addUser (obj) {
  return request({
    url: '/api/v1/user',
    method: 'PUT',
    data: obj
  })
}
/**
 * 修改用户信息.
 *
 * @author  zhanglei
 * @date 2019-03-13  16:15
 */
export function editUser (obj) {
  return request({
    url: '/api/v1/user',
    method: 'PUT',
    data: obj
  })
}
/**
 * 批量禁用用户.
 *
 * @author  zhanglei
 * @date 2019-03-13  16:16
 */
export function disabeledUserBatch (obj) {
  return request({
    url: '/api/v1/user/disable/batch',
    method: 'PUT',
    data: obj
  })
}
/**
 * 根据id禁用用户.
 *
 * @author  zhanglei
 * @date 2019-03-13  16:16
 */
export function disabeledUser (obj) {
  return request({
    url: '/api/v1/user/disable/' + obj,
    method: 'PUT'
  })
}
