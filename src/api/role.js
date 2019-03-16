import request from '@/util/request'
import qs from 'qs';

/**
 * 获取角色列表.
 *
 * @author  zhanglei
 * @date 2019-03-13  16:13
 */
export function getRoleList (obj) {
  return request({
    url: '/api/v1/role',
    method: 'get',
    data: obj
  })
}
