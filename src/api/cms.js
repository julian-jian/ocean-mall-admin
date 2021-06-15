import request from '@/utils/request'

export function fetchList(params) {
  return request({
    url: '/segment/list',
    method: 'get',
    params: params
  })
}

export function addSegment(data) {
  return request({
    url: '/segment/addSegment',
    method: 'post',
    data: data
  })
}

export function updateSegment(id, data) {
  return request({
    url: '/segment/update/' + id,
    method: 'post',
    data: data
  })
}

export function updateStatus(id, params) {
  return request({
    url: '/segment/updateStatus/' + id,
    method: 'post',
    params: params
  })
}

export function deleteSegment(id) {
  return request({
    url: '/segment/delete/' + id,
    method: 'post'
  })
}

export function getRankingIcon(type) {
  return request({
    url: '/ranking/getList/' + type,
    method: 'get'
  })
}

export function updateRanking(data) {
  return request({
    url: '/ranking/update',
    method: 'post',
    data: data
  })
}

export function addRanking(data) {
  return request({
    url: '/ranking/addRanking',
    method: 'post',
    data: data
  })
}

export function deleteRanking(id) {
  return request({
    url: '/ranking/delete/' + id,
    method: 'post'
  })
}
