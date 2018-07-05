import * as SessionsActionTypes from '../actionTypes/session';

const initialState = {
  isFetching: false,
  isAuth: false,
  userId: '',
  error: '',
  email: '',
  token: {},
  expirationTime: 0,
  tfaNeeded: false,
  tfaType: ''
}

const signup = (state, action) => {
  switch (action.type) {
    case SessionsActionTypes.SIGNUP_REQUEST:
      return {
        ...state,
        isFetching: true,
        error: ''
      }
    case SessionsActionTypes.SIGNUP_SUCCESS:
      return {
        ...state,
        userId: action.userId,
        email: action.email,
        isFetching: false
      }
    case SessionsActionTypes.SIGNUP_FAILED:
      return {
        ...state,
        isFetching: false,
        error: action.error
      }
    default:
      return state
  }
}

const repeatEmail = (state, action) => {
  switch (action.type) {
    case SessionsActionTypes.REPEAT_EMAIL_REQUEST:
      return {
        ...state,
        isFetching: true,
        error: ''
      }
    case SessionsActionTypes.REPEAT_EMAIL_SUCCESS:
      return {
        ...state,
        isFetching: false
      }
    case SessionsActionTypes.REPEAT_EMAIL_FAILED:
      return {
        ...state,
        isFetching: false,
        error: action.error
      }

    default:
      return state
  }
}

const changeEmail = (state, action) => {
  switch (action.type) {
    case SessionsActionTypes.CHANGE_EMAIL_REQUEST:
      return {
        ...state,
        isFetching: true,
        error: ''
      }
    case SessionsActionTypes.CHANGE_EMAIL_SUCCESS:
      return {
        ...state,
        isFetching: false,
        email: action.email
      }
    case SessionsActionTypes.CHANGE_EMAIL_FAILED:
      return {
        ...state,
        isFetching: false,
        error: action.error
      }

    default:
      return state
  }
}

const calcExpirationTime = expiresIn => {
  return Date.now() + (expiresIn * 100)
}

const login = (state, action) => {
  switch (action.type) {
    case SessionsActionTypes.LOGIN_REQUEST:
      return {
        ...state,
        isFetching: true,
        error: ''
      }
    case SessionsActionTypes.TFA_NEEDED:
      return {
        ...state,
        isFetching: false,
        token: action.token,
        expirationTime: calcExpirationTime(action.expiresIn),
        tfaType: action.tfaType,
        tfaNeeded: true
      }
    case SessionsActionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        isAuth: true,
        isFetching: false,
        token: action.token,
        expirationTime: calcExpirationTime(action.expiresIn)
      }
    case SessionsActionTypes.LOGIN_FAILED:
      let error = ''
      if (action.error) {
        error = action.error
      }
      return {
        ...state,
        isFetching: false,
        error: error
      }
    default:
      return state
  }
}

const recovery = (state, action) => {
  switch (action.type) {
    case SessionsActionTypes.RECOVERY_REQUEST:
      return {
        ...state,
        isFetching: true,
        error: ''
      }
    case SessionsActionTypes.RECOVERY_SUCCESS:
      return {
        ...state,
        isFetching: false
      }
    case SessionsActionTypes.RECOVERY_FAILED:
      return {
        ...state,
        isFetching: false,
        error: action.error
      }
    default:
      return state
  }
}

const newPassword = (state, action) => {
  switch (action.type) {
    case SessionsActionTypes.NEW_PASSWORD_REQUEST:
      return {
        ...state,
        isFetching: true,
        error: ''
      }
    case SessionsActionTypes.NEW_PASSWORD_SUCCESS:
      return {
        ...state,
        isFetching: false
      }
    case SessionsActionTypes.NEW_PASSWORD_FAILED:
      return {
        ...state,
        isFetching: false,
        error: action.error
      }
    default:
      return state
  }
}

const tfa = (state, action) => {
  switch (action.type) {
    case SessionsActionTypes.LOGIN_WITH_TFA_REQUEST:
      return {
        ...state,
        isFetching: true,
        error: ''
      }
    case SessionsActionTypes.LOGIN_WITH_TFA_SUCCESS:
      return {
        ...state,
        isFetching: false,
        isAuth: true,
        tfaNeeded: false
      }
    case SessionsActionTypes.LOGIN_WITH_TFA_FAILED:
      return {
        ...state,
        isFetching: false,
        error: action.error
      }
    default:
      return state
  }
}

const resetExpTime = (state) => {
  return {
    ...state,
    expirationTime: 0
  }
}

export const session = (state = initialState, action) => {
  switch (action.type) {
    case SessionsActionTypes.SIGNUP_REQUEST:
    case SessionsActionTypes.SIGNUP_SUCCESS:
    case SessionsActionTypes.SIGNUP_FAILED:
      return signup(state, action)

    case SessionsActionTypes.REPEAT_EMAIL_REQUEST:
    case SessionsActionTypes.REPEAT_EMAIL_SUCCESS:
    case SessionsActionTypes.REPEAT_EMAIL_FAILED:
      return repeatEmail(state, action)

    case SessionsActionTypes.CHANGE_EMAIL_REQUEST:
    case SessionsActionTypes.CHANGE_EMAIL_SUCCESS:
    case SessionsActionTypes.CHANGE_EMAIL_FAILED:
      return changeEmail(state, action)

    case SessionsActionTypes.LOGIN_REQUEST:
    case SessionsActionTypes.TFA_NEEDED:
    case SessionsActionTypes.LOGIN_SUCCESS:
    case SessionsActionTypes.LOGIN_FAILED:
      return login(state, action)

    case SessionsActionTypes.LOGIN_WITH_TFA_REQUEST:
    case SessionsActionTypes.LOGIN_WITH_TFA_SUCCESS:
    case SessionsActionTypes.LOGIN_WITH_TFA_FAILED:
      return tfa(state, action)

    case SessionsActionTypes.RECOVERY_REQUEST:
    case SessionsActionTypes.RECOVERY_SUCCESS:
    case SessionsActionTypes.RECOVERY_FAILED:
      return recovery(state, action)

    case SessionsActionTypes.NEW_PASSWORD_REQUEST:
    case SessionsActionTypes.NEW_PASSWORD_SUCCESS:
    case SessionsActionTypes.NEW_PASSWORD_FAILED:
      return newPassword(state, action)

    case SessionsActionTypes.LOGOUT_SUCCESS:
      return initialState

    case SessionsActionTypes.RESET_EXPIRATION_TIME:
      return resetExpTime(state)
    default:
      return state
  }
}
