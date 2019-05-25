import request from '@/utils/request'
import { getUserToken } from '@/utils/authority'

export async function uploadFile(data) {
  let token = await getUserToken()
  let fd = new FormData()
  fd.append('file[new_image_path][]', data)
  return request('/server/api/v1/files', {
    method: 'POST',
    body: fd,
    headers: {
      'Authorization': token,
    },
  })
}
