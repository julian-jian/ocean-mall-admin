import request from '@/utils/request'
export function fetchList(params) {
  return request({
    url:'/home/remind/list',
    method:'get',
    params:params
  })
}
export function updateStatus(id,params) {
  return request({
    url:'/home/remind/update/status/'+id,
    method:'post',
    params:params
  })
}
export function deleteHomeRemind(data) {
  return request({
    url:'/home/remind/delete',
    method:'post',
    data:data
  })
}
export function createHomeRemind(data) {
  return request({
    url:'/home/remind/create',
    method:'post',
    data:data
  })
}
export function getHomeRemind(id) {
  return request({
    url:'/home/remind/'+id,
    method:'get',
  })
}

export function updateHomeRemind(id,data) {
  return request({
    url:'/home/remind/update/'+id,
    method:'post',
    data:data
  })
}
