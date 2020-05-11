import request from '@/utils/request'

/**
 * 获取管理员列表
 * @param params
 * @returns {AxiosPromise}
 */
export function getAdmin(params) {
  return request({
    url: `/security/admin`,
    params,
    method: 'get'
  })
}

/**
 * 添加管理员
 * @param data
 * @returns {AxiosPromise}
 */
export function addAdmin(data) {
  return request({
    url: `/security/admin`,
    method: 'post',
    data
  })
}

/**
 * 修改管理员
 * @param data
 * @param id
 */
export function putAdmin(data, id) {
  return request({
    url: `security/admin/${id}`,
    method: 'put',
    data
  })
}

/**
 * 删除管理员
 * @param id
 * @returns {AxiosPromise}
 */
export function deletaAdmin(id) {
  return request({
    url: `/security/admin/${id}`,
    method: 'delete'
  })
}

