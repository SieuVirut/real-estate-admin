import request from '@/utils/request'
import { getUserToken } from '@/utils/authority'

export async function fetchListProject() {
  let token = await getUserToken()
  return request('/server/api/v1/projects', {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      'Authorization': token
    }
  })
}

export async function createProject(data) {
  let token = await getUserToken()
  return request('/server/api/v1/projects', {
    method: 'POST',
    body: data,
    headers: {
      "Content-Type": "application/json",
      'Authorization': token
    },
  })
}

export async function deleteProject(data) {
  let token = await getUserToken()
  let id = data && data.id
  return request(`/server/api/v1/projects/${id}`, {
    method: 'DELETE',
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      'Authorization': token,
    },
  })
}

export async function fetchProjectInfoById(id) {
  let token = await getUserToken()
  return request(`/server/api/v1/projects/${id}`, {
    headers: {
      "Content-Type": "application/json",
      'Authorization': token
    },
  })
}

export async function updateProjectInfoById(data) {
  let token = await getUserToken()
  let id = data && data.project && data.project.id
  return request(`/server/api/v1/projects/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
      'Authorization': token,
    },
  })
}


export async function getImagesByProjectId(id) {
  if (!id) return
  let token = await getUserToken()
  return request(`/server/api/v1/projects/${id}/get_images`, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      'Authorization': token
    }
  })
}

