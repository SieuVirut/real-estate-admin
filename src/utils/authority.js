// use localStorage to store the authority info, which might be sent from server in actual project.
export function getAuthority(str) {
  // return localStorage.getItem('real-estate-authority') || ['admin', 'user'];
  const authorityString =
    typeof str === 'undefined' ? localStorage.getItem('real-estate-authority') : str;
  // authorityString could be admin, "admin", ["admin"]
  let authority;
  try {
    authority = JSON.parse(authorityString);
  } catch (e) {
    authority = authorityString;
  }
  if (typeof authority === 'string') {
    return [authority];
  }
  return authority;
}

export function setAuthority(authority) {
  const proAuthority = typeof authority === 'string' ? [authority] : authority;
  return localStorage.setItem('real-estate-authority', JSON.stringify(proAuthority));
}


export function setUserToken(token) {
  let newToken
  try {
    newToken = typeof token === 'undefined' ? localStorage.getItem('newToken') : token
    localStorage.setItem('userToken', newToken)
  } catch (e) {
    console.log('set user token fail', e)
  }
}

export function getUserToken() {
  let token
  try {
    token = localStorage.getItem('userToken').replace(`"`,``)

  } catch (e) {
    console.log('get user token fail', e)
  }
  return token
}

export function removeUserToken() {
  try {
    localStorage.removeItem('userToken')
  } catch (e) {
    console.log('get user token fail', e)
  }
}