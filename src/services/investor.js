import request from '@/utils/request'
import { getUserToken } from '@/utils/authority'
import { fakeSubmitForm } from './api';

export async function fetchListInvestor() {
  let token = await getUserToken()
  return request('/server/api/v1/companies?type=investor', {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      'Authorization': token
    },
  })
}

export async function createInvestor(data) {
  let token = await getUserToken()
  return request('/server/api/v1/companies', {
    method: 'POST',
    body: data,
    headers: {
      'Authorization': token,
    },
  })
}

export async function deleteInvestor(data) {
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

export async function fetchInvestorInfoById(data) {
  let token = await getUserToken()
  let id = data && data.id
  return request(`/server/api/v1/companies/${id}`, {
    headers: {
      "Content-Type": "application/json",
      'Authorization': token
    },
  })
}

export async function updateInvestorInfoById(data) {
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

export async function fetchListInvestorByKeyword(keyword) {
  let token = await getUserToken()
  return request(`/server/api/v1/companies?keyword=${keyword}&type=${'investor'}&page=${'1'}`, {
    headers: {
      "Content-Type": "application/json",
      'Authorization': token
    },
  })
}
