import * as ProfileActionTypes from '../actionTypes/profile';
import api from '../../api';

const getProfileRequest = () => {
  return {
    type: ProfileActionTypes.GET_PROFILE_REQUEST
  }
}

const getProfileSuccess = (list) => {
  return {
    type: ProfileActionTypes.GET_PROFILE_SUCCESS,
    list
  }
}

const getProfileFailed = (error) => {
  return {
    type: ProfileActionTypes.GET_PROFILE_FAILED,
    error
  }
}

export const getProfile = () => {
  return dispatch => {
    dispatch(getProfileRequest())
    return api.get('/api/profile', '')
      .then(response => {
        if (typeof response === 'object') {
          dispatch(getProfileSuccess(response))
        }
        return Promise.resolve()
      })
      .catch(error => {
        dispatch(getProfileFailed(error.text))
        return Promise.reject(error.text)
      })
  }
}

const submitProfileRequest = () => {
  return {
    type: ProfileActionTypes.SUBMIT_PROFILE_REQUEST
  }
}

const submitProfileSuccess = () => {
  return {
    type: ProfileActionTypes.SUBMIT_PROFILE_SUCCESS
  }
}

const submitProfileFailed = (error) => {
  return {
    type: ProfileActionTypes.SUBMIT_PROFILE_FAILED,
    error
  }
}

export function submitProfile (data) {
  return dispatch => {
    dispatch(submitProfileRequest())
    return api.post('/api/profile', data)
      .then(response => {
        dispatch(submitProfileSuccess())
        return Promise.resolve()
      })
      .catch(error => {
        dispatch(submitProfileFailed(error.text))
        return Promise.reject(error)
      })
  }
}

const changePasswordRequest = () => {
  return {
    type: ProfileActionTypes.CHANGE_PASSWORD_REQUEST
  }
}

const changePasswordSuccess = () => {
  return {
    type: ProfileActionTypes.CHANGE_PASSWORD_SUCCESS
  }
}

const changePasswordFailed = () => {
  return {
    type: ProfileActionTypes.CHANGE_PASSWORD_FAILED
  }
}

export const changePassword = (data) => {
  return dispatch => {
    dispatch(changePasswordRequest())
    return api.post('/api/profile/password', data)
      .then(response => {
        dispatch(changePasswordSuccess())
        return Promise.resolve()
      })
      .catch(error => {
        dispatch(changePasswordFailed())
        return Promise.reject(error)
      })
  }
}
