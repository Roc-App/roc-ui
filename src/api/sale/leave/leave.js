import request from '@/utils/request'

// 查询请假管理列表
export function listLeave(query) {
  return request({
    url: '/sale/leave/list',
    method: 'get',
    params: query
  })
}

// 查询请假管理详细
export function getLeave(leaveId) {
  return request({
    url: '/sale/leave/' + leaveId,
    method: 'get'
  })
}

// 新增请假管理
export function addLeave(data) {
  return request({
    url: '/sale/leave',
    method: 'post',
    data: data
  })
}

// 修改请假管理
export function updateLeave(data) {
  return request({
    url: '/sale/leave',
    method: 'put',
    data: data
  })
}

// 删除请假管理
export function delLeave(leaveId) {
  return request({
    url: '/sale/leave/' + leaveId,
    method: 'delete'
  })
}
