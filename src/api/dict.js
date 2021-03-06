import request from '@/util/request'
import qs from 'qs';

/**
 * 获取省列表.
 *
 * @author  zhanglei
 * @date 2019-03-13  16:13
 */
export function getProvinceList() {
  return request({
    url: '/api/v1/dict/region/province',
    method: 'GET'
  });
}

/**
 * 获取市列表.
 *
 * @author  zhanglei
 * @date 2019-03-13  16:13
 */
export function getCityList(obj) {
  return request({
    url: '/api/v1/dict/region/city',
    method: 'GET',
    data: obj
  });
}

/**
 * 获取市列表.
 *
 * @author  zhanglei
 * @date 2019-03-13  16:13
 */
export function getAreaList(obj) {
  return request({
    url: '/api/v1/dict/region/area',
    method: 'GET',
    data: obj
  });
}