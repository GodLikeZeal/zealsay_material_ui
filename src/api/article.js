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

/**
 * 根据id查询文章作品详情.
 *
 * @author  zhanglei
 * @date 2019-05-15  14:53
 */
export function getArticle (id) {
  return request({
    url: '/api/v1/article/' + id,
    method: 'get'
  })
}

/**
 * 添加文章.
 *
 * @author  zhanglei
 * @date 2019-03-13  16:13
 */
export function saveArticle (obj) {
  return request({
    url: '/api/v1/article',
    method: 'post',
    data: obj
  })
}

/**
 * 分页查询文章列表.
 *
 * @author  zhanglei
 * @date 2019-03-13  16:13
 */
export function getArticlePageList (obj) {
  return request({
    url: '/api/v1/article/page',
    method: 'get',
    data: obj
  })
}

/**
 * 下架文章作品.
 *
 * @author  zhanglei
 * @date 2019-05-15  12:04
 */
export function markArticleDown (id) {
  return request({
    url: '/api/v1/article/down/' + id,
    method: 'put'
  })
}

/**
 * 上架文章作品.
 *
 * @author  zhanglei
 * @date 2019-05-15  12:05
 */
export function markArticleUp (id) {
  return request({
    url: '/api/v1/article/up/' + id,
    method: 'put'
  })
}