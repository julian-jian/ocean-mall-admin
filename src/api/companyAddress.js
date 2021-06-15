import request from '@/utils/request'
export function fetchList() {
  return request({
    url:'/companyAddress/list',
    method:'get'
  })
}

export function deleteCompanyAddress(id) {
  return request({
    url:'/companyAddress/delete/'+id,
    method:'post'
  })
}

export function createCompanyAddress(data) {
  return request({
    url:'/companyAddress/create',
    method:'post',
    data:data
  })
}

export function updateCompanyAddress(id,data) {
  return request({
    url:'/companyAddress/update/'+id,
    method:'post',
    data:data
  })
}

export function getCompanyAddress(id) {
  return request({
    url:'/companyAddress/'+id,
    method:'get',
  })
}
