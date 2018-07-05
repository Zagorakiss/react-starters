import * as SessionsActionTypes from '../actionTypes/session';
import api from '../../api';

const signupRequest = () => {
  return {
    type: SessionsActionTypes.SIGNUP_REQUEST
  }
}

const signupSuccess = (userId, email) => {
  return {
    type: SessionsActionTypes.SIGNUP_SUCCESS,
    userId,
    email
  }
}

const signupFailed = (error) => {
  return {
    type: SessionsActionTypes.SIGNUP_FAILED,
    error
  }
}

export const signup = (userData) => {
  return dispatch => {
    dispatch(signupRequest())
    return api.post('/user/register', userData)
      .then(response => {
        if (response.user_id) {
          dispatch(signupSuccess(response.user_id, userData.email))
        }
      })
      .catch(error => dispatch(signupFailed(error.text)))
  }
}

const emailRepeatRequest = () => {
  return {
    type: SessionsActionTypes.REPEAT_EMAIL_REQUEST
  }
}

const emailRepeatSuccess = () => {
  return {
    type: SessionsActionTypes.REPEAT_EMAIL_SUCCESS
  }
}

const emailRepeatFailed = (error) => {
  return {
    type: SessionsActionTypes.REPEAT_EMAIL_FAILED,
    error
  }
}

export const emailRepeat = (userId) => {
  return dispatch => {
    dispatch(emailRepeatRequest())
    return api.post('/user/resend_mail', userId)
      .then(() => {
        dispatch(emailRepeatSuccess())
        return Promise.resolve()
      })
      .catch(error => {
        dispatch(emailRepeatFailed(error.text))
        return Promise.reject(error.text)
      })
  }
}

const changeEmailRequest = () => {
  return {
    type: SessionsActionTypes.CHANGE_EMAIL_REQUEST
  }
}

const changeEmailSuccess = (email) => {
  return {
    type: SessionsActionTypes.CHANGE_EMAIL_SUCCESS,
    email
  }
}

const changeEmailFailed = (error) => {
  return {
    type: SessionsActionTypes.CHANGE_EMAIL_FAILED,
    error
  }
}

export const changeEmail = (userData) => {
  return dispatch => {
    dispatch(changeEmailRequest())
    return api.post('/user/reg_change_mail', userData)
      .then(() => dispatch(changeEmailSuccess(userData.new)))
      .catch(error => dispatch(changeEmailFailed(error.text)))
  }
}

const loginRequest = () => {
  return {
    type: SessionsActionTypes.LOGIN_REQUEST
  }
}

const loginSuccess = (token, expiresIn) => {
  return {
    type: SessionsActionTypes.LOGIN_SUCCESS,
    token,
    expiresIn
  }
}

const loginFailed = error => {
  return {
    type: SessionsActionTypes.LOGIN_FAILED,
    error
  }
}

const tfaNeeded = (token, expiresIn, tfaType) => {
  return {
    type: SessionsActionTypes.TFA_NEEDED,
    token,
    expiresIn,
    tfaType
  }
}

export const login = (userData) => {
  return dispatch => {
    dispatch(loginRequest())
    return api.post('/user/login', userData)
      .then(response => {
        if (response.expires_in) {
          const token = {
            access_token: response.access_token,
            refresh_token: response.refresh_token
          }
          localStorage.setItem('token', JSON.stringify(token))
          if (response.active) {
            return dispatch(loginSuccess(token, response.expires_in))
          } else {
            return dispatch(tfaNeeded(token, response.expires_in, response.type))
          }
        } else {
          dispatch(loginFailed('No expiration time in response'))
          return Promise.resolve()
        }
      })
      .catch(error => {
        dispatch(loginFailed(error.text))
        return Promise.reject(error)
      })
  }
}

const loginWithTfaRequest = () => {
  return {
    type: SessionsActionTypes.LOGIN_WITH_TFA_REQUEST
  }
}

const loginWithTfaSuccess = () => {
  return {
    type: SessionsActionTypes.LOGIN_WITH_TFA_SUCCESS
  }
}

const loginWithTfaFailed = (error) => {
  return {
    type: SessionsActionTypes.LOGIN_WITH_TFA_FAILED,
    error
  }
}

export const loginWithTfa = (data) => {
  return dispatch => {
    dispatch(loginWithTfaRequest())
    return api.post('/user/tfa', data)
      .then(() => {
        dispatch(loginWithTfaSuccess())
        return Promise.resolve()
      })
      .catch(error => {
        if (error.text) {
          dispatch(loginWithTfaFailed(error.text))
        }
        return Promise.reject(error.text)
      })
  }
}

const recoveryRequest = () => {
  return {
    type: SessionsActionTypes.RECOVERY_REQUEST
  }
}

const recoverySuccess = (email, token) => {
  return {
    type: SessionsActionTypes.RECOVERY_SUCCESS
  }
}

const recoveryFailed = (error) => {
  return {
    type: SessionsActionTypes.RECOVERY_FAILED,
    error
  }
}

export const recovery = (email) => {
  return dispatch => {
    dispatch(recoveryRequest())
    return api.get('/user/restore/', email)
      .then(() => {
        dispatch(recoverySuccess())
        Promise.resolve()
      })
      .catch(error => {
        dispatch(recoveryFailed(error.text))
        Promise.reject(error.text)
      })
  }
}

const newPasswordRequest = () => {
  return {
    type: SessionsActionTypes.NEW_PASSWORD_REQUEST
  }
}

const newPasswordSuccess = () => {
  return {
    type: SessionsActionTypes.NEW_PASSWORD_SUCCESS
  }
}

const newPasswordFailed = (error) => {
  return {
    type: SessionsActionTypes.NEW_PASSWORD_FAILED,
    error
  }
}

export const newPassword = (data) => {
  return dispatch => {
    dispatch(newPasswordRequest())
    return api.post('/user/change_pass/', data)
      .then(() => {
        dispatch(newPasswordSuccess())
      })
      .catch(error => {
        dispatch(newPasswordFailed(error.text))
        return Promise.reject('Password change failed')
      })
  }
}

const logoutSuccess = () => {
  return {
    type: SessionsActionTypes.LOGOUT_SUCCESS
  }
}

export const logout = () => {
  return dispatch => {
    return api.delete('/user/logout', '')
      .then(() => {
        localStorage.removeItem('token')
        dispatch(logoutSuccess())
        return Promise.resolve()
      })
      .catch(error => Promise.reject(error))
  }
}

export const resetExpTime = () => {
  return {
    type: SessionsActionTypes.RESET_EXPIRATION_TIME
  }
}
