import request from '@/utils/request'

// 查询请假管理列表
export function getSeq() {
  return request({
    url: '/Seq/getSeq',
    method: 'get'
  })
}
