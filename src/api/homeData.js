import request from '@/utils/request'
export function getOrderData() {
  return request({
    url:'/data/orderData',
    method:'get'
  })
}

export function getProductData() {
  return request({
    url:'/data/productData',
    method:'get'
  })
}

export function getMemberData() {
  return request({
    url:'/data/memberData',
    method:'get'
  })
}

export function getTotalData() {
  return request({
    url: '/data/totalData',
    method: 'get'
  })
}

export function getSaleData() {
  return request({
    url: '/data/saleData',
    method: 'get'
  })
}

export function getChartData(params) {
  return request({
    url: '/data/getChartData',
    method: 'get',
    params: params
  })
}

