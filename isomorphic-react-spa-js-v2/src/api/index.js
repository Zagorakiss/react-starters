import { store } from '../config/store';
import { login, logout, resetExpTime } from '../redux/actions/session';

const API = `https://api.bcwallet.info/v1`;

const headers = () => {
  const token = store.getState().session.token.access_token
  if (token) {
    return {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    }
  } else {
    return {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  }
}

const parseResponse = (response) => {
  return response.json().then(json => {
    if (!response.ok) {
      if (response.status === 401 && !store.getState().session.isFetching) {
        loginWithToken()
          .catch(() => store.dispatch(logout()))
      } 
      // else {
      //   if (i18next.exists(`systemErrors:${json.text}`)) {
      //     store.dispatch(openError(i18next.t(`systemErrors:${json.text}`)))
      //   }
      // }
      return Promise.reject(json)
    }
    return json
  })
}

const loginWithToken = () => {
  const token = {
    refresh_token: store.getState().session.token.refresh_token
  }
  store.dispatch(login(token))
    .catch(er => Promise.reject(er))
}

const checkTokenExpiration = async () => {
  const { expirationTime, isAuth } = store.getState().session
  if (isAuth && expirationTime > 0) {
    const delta = expirationTime - Date.now()
    if (delta < 30000) {
      store.dispatch(resetExpTime())
      await loginWithToken()
    }
  }
  return null
}

export default {
  async get (url, params) {
    await checkTokenExpiration()
    return fetch(`${API}${url}${params}`, {
      method: 'GET',
      headers: headers()
    })
    .then(parseResponse)
  },

  async post (url, data) {
    await checkTokenExpiration()
    const body = JSON.stringify(data)
    return fetch(`${API}${url}`, {
      method: 'POST',
      headers: headers(),
      body
    })
    .then(parseResponse)
  },

  async patch (url, data) {
    await checkTokenExpiration()
    const body = JSON.stringify(data)
    return fetch(`${API}${url}`, {
      method: 'PATCH',
      headers: headers(),
      body
    })
    .then(parseResponse)
  },

  async delete (url, params) {
    await checkTokenExpiration()
    return fetch(`${API}${url}${params}`, {
      method: 'DELETE',
      headers: headers()
    })
    .then(parseResponse)
  }
}
