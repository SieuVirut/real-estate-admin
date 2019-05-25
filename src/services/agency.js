import request from '@/utils/request'
import { getUserToken } from '@/utils/authority'

export async function fetchListAgency() {
  let token = await getUserToken()
  return request('/server/api/v1/companies?type=agency', {
    headers: {
      "Content-Type": "application/json",
      'Authorization': token
    },
  })
}

export async function fetchAgencyDetailById(data) {
  let token = await getUserToken()
  let id = data && data.id
  return request(`/server/api/v1/companies/${id}`, {
    headers: {
      "Content-Type": "application/json",
      'Authorization': token
    },
  })
}

export async function fetchListRequestToJoinAgency() {
  let token = await getUserToken()
  return request('/server/api/v1/company-users?active=false', {
    headers: {
      "Content-Type": "application/json",
      'Authorization': token
    },
  })
}

export async function createAgency(data) {
  let token = await getUserToken()
  return request('/server/api/v1/companies', {
    method: 'POST',
    body: data,
    headers: {
      'Authorization': token,
    },
  })
}

export async function updateAgencyById(data) {
  let token = await getUserToken()
  let id = data && data.company && data.company.id
  return request(`/server/api/v1/companies/${id}`, {
    method: 'PUT',
    body: data,
    headers: {
      'Authorization': token,
    },
  })
}

export async function deleteAgency(data) {
  let token = await getUserToken()
  let id = data && data.id
  return request(`/server/api/v1/companies/${id}`, {
    method: 'DELETE',
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      'Authorization': token,
    },
  })
}

export async function requestJoinAgency(companyId, data) {
  let token = await getUserToken()
  return request(`/server/api/v1/companies/${companyId}/join`, {
    method: 'PUT',
    body: data,
    headers: {
      'Authorization': token,
    },
  })
}

