import request from '@/utils/request'
import { getUserToken } from '@/utils/authority'

export async function fetchListFacilities() {
  let token = await getUserToken()
  return request('/server/api/v1/facilities', {
    headers: {
      "Content-Type": "application/json",
      'Authorization': token
    },
  })
}

export async function createFacility(data) {
  let token = await getUserToken()
  return request('/server/api/v1/facilities', {
    method: 'POST',
    body: data,
    headers: {
      "Content-Type": "application/json",
      'Authorization': token,
    },
  })
}

export async function deleteFacility(data) {
  let token = await getUserToken()
  let id = data && data.id
  return request(`/server/api/v1/facilities/${id}`, {
    method: 'DELETE',
    headers: {
      "Content-Type": "application/json",
      'Authorization': token,
    },
  })
}

