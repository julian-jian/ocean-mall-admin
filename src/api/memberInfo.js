import request from '@/utils/request'
export function fetchList(params) {
  return request({
    url:'/member/list',
    method:'get',
    params:params
  })
}

export function fetchCollectionList(params) {
  return request({
    url:'/member/collection/list',
    method:'get',
    params:params
  })
}
