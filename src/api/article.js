import request from '@/utils/request'

/**
 * 获取文章列表
 * @param params
 * @returns {AxiosPromise}
 */
export function getArticle(params) {
  return request({
    url: '/article',
    method: 'get',
    params
  })
}

/**
 * 添加文章
 * @param data
 * @returns {AxiosPromise}
 */
export function addArticle(data) {
  return request({
    url: '/article',
    method: 'post',
    data
  })
}

/**
 * 获取文章详情
 * @param id
 * @returns {AxiosPromise}
 */
export function getArticleDetail(id) {
  return request({
    url: `article/${id}`,
    method: 'get'
  })
}

/**
 * 编辑文章
 * @param data
 * @param id
 * @returns {AxiosPromise}
 */
export function putArticle(data, id) {
  return request({
    url: `/article/${id}`,
    method: 'put',
    data
  })
}

/**
 * 删除文章
 * @param id
 * @returns {AxiosPromise}
 */
export function deleteArticle(id) {
  return request({
    url: `/article/${id}`,
    method: 'delete'
  })
}

/**
 * 开启、关闭评论
 * @param data
 * @param id
 * @returns {AxiosPromise}
 */
export function openOrCloseComment(data, id) {
  return request({
    url: `article/openComment/${id}`,
    method: 'put',
    data
  })
}

/**
 * 是否设置为推荐文章
 * @param data
 * @param id
 * @returns {AxiosPromise}
 */
export function recommend(data, id) {
  return request({
    url: `article/recommend/${id}`,
    method: 'put',
    data
  })
}

/**
 * 设置文章置顶
 * @param data
 * @param id
 * @returns {AxiosPromise}
 */
export function setArticleTop(data, id) {
  return request({
    url: `article/article-top/${id}`,
    method: 'put',
    data
  })
}

/**
 * 设置文章为发布
 * @param data
 * @param id
 * @returns {AxiosPromise}
 */
export function setArticleRelease(data, id) {
  return request({
    url: `article/article-release/${id}`,
    method: 'put',
    data
  })
}
