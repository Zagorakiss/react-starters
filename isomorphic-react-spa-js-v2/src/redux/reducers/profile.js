import * as ProfileActionTypes from '../actionTypes/profile';
import * as SessionsActionTypes from '../actionTypes/session';

const initialState = {
  isFetching: false,
  dataLoaded: false,
  list: {
    email: 'email@example.com',
    // name: 'User Name',
    // language: '',
    // tfa: {
    //   state: false,
    //   type: 'telegram',
    //   signin: false,
    //   send: false
    // },
    favorites: [
        {
            name: "Litecoin",
            key: "LTC",
            industry: "finance",
            year: 2010,
            marketcap: 130.84,
            price: 600,
            consensusAlgorithm: "pow",
            stage: "tokenized",
            logo: "https://s3.eu-central-1.amazonaws.com/bcwallet/mobile/resource_logo-d13e8cd1113fac484b6d88297ed7b840.png"
        },
        {
            name: "Bitcoin",
            key: "BTC",
            industry: "finance",
            year: 2009,
            marketcap: 130.84,
            price: 7600,
            consensusAlgorithm: "pow",
            stage: "tokenized",
            logo: "https://s3.eu-central-1.amazonaws.com/bcwallet/mobile/resource_logo-b1b91bc348392a27c59fc61d4153a72e.png"
        }
    ]
  }
}

const getProfile = (state, action) => {
  switch (action.type) {
    case ProfileActionTypes.GET_PROFILE_REQUEST:
      return {
        ...state,
        isFetching: true,
        dataLoaded: false,
        error: ''
      }
    case ProfileActionTypes.GET_PROFILE_SUCCESS:
      return {
        ...state,
        isFetching: false,
        dataLoaded: true,
        // list: action.list
        list: state.list
      }
    case ProfileActionTypes.GET_PROFILE_FAILED:
      return {
        ...state,
        isFetching: false,
        dataLoaded: false,
        error: action.error
      }
    default:
      return state
  }
}

const submitProfile = (state, action) => {
  switch (action.type) {
    case ProfileActionTypes.SUBMIT_PROFILE_REQUEST:
      return {
        ...state,
        isFetching: true,
        error: ''
      }
    case ProfileActionTypes.SUBMIT_PROFILE_SUCCESS:
      return {
        ...state,
        isFetching: false
      }
    case ProfileActionTypes.SUBMIT_PROFILE_FAILED:
      return {
        ...state,
        isFetching: false,
        error: action.error
      }
    default:
      return state
  }
}

const changePassword = (state, action) => {
  switch (action.type) {
    case ProfileActionTypes.CHANGE_PASSWORD_REQUEST:
      return {
        ...state,
        isFetching: true
      }
    case ProfileActionTypes.CHANGE_PASSWORD_SUCCESS:
      return {
        ...state,
        isFetching: false
      }
    case ProfileActionTypes.CHANGE_PASSWORD_FAILED:
      return {
        ...state,
        isFetching: false
      }
    default:
      return state
  }
}

export const profile = (state = initialState, action) => {
  switch (action.type) {
    case ProfileActionTypes.GET_PROFILE_REQUEST:
    case ProfileActionTypes.GET_PROFILE_SUCCESS:
    case ProfileActionTypes.GET_PROFILE_FAILED:
      return getProfile(state, action)

    case ProfileActionTypes.SUBMIT_PROFILE_REQUEST:
    case ProfileActionTypes.SUBMIT_PROFILE_SUCCESS:
    case ProfileActionTypes.SUBMIT_PROFILE_FAILED:
      return submitProfile(state, action)

    case ProfileActionTypes.CHANGE_PASSWORD_REQUEST:
    case ProfileActionTypes.CHANGE_PASSWORD_SUCCESS:
    case ProfileActionTypes.CHANGE_PASSWORD_FAILED:
      return changePassword(state, action)

    case SessionsActionTypes.LOGOUT_SUCCESS:
      return initialState

    default:
      return state
  }
}
