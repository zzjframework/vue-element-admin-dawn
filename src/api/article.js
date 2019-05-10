import request from '@/utils/request'

export function fetchList (query) {
  return request({
    url: '/article/list',
    method: 'get',
    params: query
  })
}

export function fetchComments (query) {
  return request(
    {
      // url 必须能匹配你的接口路由
      // 比如 fetchComments 对应的路由可能是 /article/1/comments 或者 /article/2/comments
      // 所以你需要通过正则来进行匹配
      url: '/user/userinfo',
      method: 'get',
      params: query
    })
}

export function fetchArticle (id) {
  return request({
    url: '/article/detail',
    method: 'get',
    params: { id }
  })
}

export function fetchPv (pv) {
  return request({
    url: '/article/pv',
    method: 'get',
    params: { pv }
  })
}

export function createArticle (data) {
  return request({
    url: '/article/create',
    method: 'post',
    data
  })
}

export function updateArticle (data) {
  return request({
    url: '/article/update',
    method: 'post',
    data
  })
}
