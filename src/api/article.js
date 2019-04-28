import request from '@/util/request'

/**
 * 获取分类列表.
 *
 * @author  zhanglei
 * @date 2019-03-13  16:13
 */
export function getCategoryList (obj) {
  return request({
    url: '/api/v1/articleCategory',
    method: 'get',
    data: obj
  })
}

/**
 * 新增分类目录.
 *
 * @author  zhanglei
 * @date 2019-03-13  16:13
 */
export function addCategory (obj) {
  return request({
    url: '/api/v1/articleCategory',
    method: 'post',
    data: obj
  })
}

/**
 * 修改分类目录.
 *
 * @author  zhanglei
 * @date 2019-03-13  16:13
 */
export function updateCategory (obj) {
  return request({
    url: '/api/v1/articleCategory',
    method: 'put',
    data: obj
  })
}

/**
 * 删除分类目录.
 *
 * @author  zhanglei
 * @date 2019-03-13  16:13
 */
export function deleteCategory (id) {
  return request({
    url: '/api/v1/articleCategory/' + id,
    method: 'delete'
  })
}