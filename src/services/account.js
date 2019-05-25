import request from '@/utils/request'
// import 'isomorphic-fetch'

export async function login(params) {
  return request('/server/api/v1/sessions', {
    method: 'POST',
    body: params,
    headers: { "Content-Type": "application/json" },
  });
}
