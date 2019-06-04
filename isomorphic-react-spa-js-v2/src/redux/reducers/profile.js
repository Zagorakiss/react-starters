import * as ProfileActionTypes from '../actionTypes/profile';
import * as SessionsActionTypes from '../actionTypes/session';

const initialState = {
  isFetching: false,
  dataLoaded: false,
  list: {
    email: 'email@example.com',
    registration_date: "2018-12-25",
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
        "name": "Bitcoin",
        "key": "BTC",
        "industry": "finance",
        "year": 2009,
        "marketcap": 122489.86,
        "marketcap_change": {
          "percents": 4.43,
          "usd": 144.32,
          "trend": "up"
        },
        "price": 7123.37,
        "price_change": {
          "percents": 4.43,
          "usd": 144.32,
          "trend": "up"
        },
        "consensusAlgorithm": "pow",
        "stage": "tokenized",
        "logo": "https://s3.eu-central-1.amazonaws.com/bcwallet/mobile/resource_logo-b1b91bc348392a27c59fc61d4153a72e.png",
        "site": "https://bitcoin.org/",
        "social_links": {
          "fb": "https://www.facebook.com/btc/",
          "tw": "https://www.twitter.com/btc/",
          "tg": "https://t.me/btc/",
          "vk": "https://vk.com/btc/"
        },
        "description": "Bitcoin is the first successful internet money based on peer-to-peer technology; whereby no central bank or authority is involved in the transaction and production of the Bitcoin currency. It was created by an anonymous individual/group under the name, Satoshi Nakamoto. The source code is available publicly as an open source project, anybody can look at it and be part of the developmental process.",
        "related_projects": [
          {
            "key": "ZCH",
            "logo": "https://s3.eu-central-1.amazonaws.com/bcwallet/mobile/resource_logo-d13e8cd1113fac484b6d88297ed7b840.png"
          },
          {
            "key": "WAVES",
            "logo": "https://s3.eu-central-1.amazonaws.com/bcwallet/mobile/resource_logo-c0f42fe6037e2ef5ac464d84fa8bcdab.png"
          }
        ],
        "partner_projects": [
          {
            "key": "ZCH",
            "logo": "https://s3.eu-central-1.amazonaws.com/bcwallet/mobile/resource_logo-d13e8cd1113fac484b6d88297ed7b840.png"
          },
          {
            "key": "WAVES",
            "logo": "https://s3.eu-central-1.amazonaws.com/bcwallet/mobile/resource_logo-c0f42fe6037e2ef5ac464d84fa8bcdab.png"
          }
        ],
        "social_activity": [
          {
            "logo": "https://s3.eu-central-1.amazonaws.com/bcwallet/mobile/resource_logo-c0f42fe6037e2ef5ac464d84fa8bcdab.png",
            "date": "30.05.18, 19:23",
            "text": "blablabla"
          },
          {
            "logo": "https://s3.eu-central-1.amazonaws.com/bcwallet/mobile/resource_logo-c0f42fe6037e2ef5ac464d84fa8bcdab.png",
            "date": "30.05.18, 19:23",
            "text": "blablabla"
          },
          {
            "logo": "https://s3.eu-central-1.amazonaws.com/bcwallet/mobile/resource_logo-c0f42fe6037e2ef5ac464d84fa8bcdab.png",
            "date": "30.05.18, 19:23",
            "text": "blablabla"
          }
        ]
      },
      {
        "name": "Litecoin",
        "key": "LTC",
        "industry": "finance",
        "year": 2010,
        "marketcap": 4302.67,
        "marketcap_change": {
          "percents": 2.43,
          "usd": 14.32,
          "trend": "down"
        },
        "price": 74.51,
        "price_change": {
          "percents": 4.43,
          "usd": 144.32,
          "trend": "down"
        },
        "consensusAlgorithm": "pow",
        "stage": "tokenized",
        "logo": "https://s3.eu-central-1.amazonaws.com/bcwallet/mobile/resource_logo-d13e8cd1113fac484b6d88297ed7b840.png",
        "site": "https://litecoin.org/",
        "social_links": {
          "fb": "https://www.facebook.com/ltc/",
          "tw": "https://www.twitter.com/ltc/",
          "tg": "https://t.me/ltc/",
          "vk": "https://vk.com/ltc/"
        },
        "description": "Litecoin is a peer-to-peer cryptocurrency created by Charlie Lee. It was created based on the Bitcoin protocol but differs in terms of the hashing algorithm used. Litecoin uses the memory intensive Scrypt proof of work mining algorithm. Scrypt allows consumer-grade hardware such as GPU to mine those coins.",
        "related_projects": [
          {
            "key": "ZCH",
            "logo": "https://s3.eu-central-1.amazonaws.com/bcwallet/mobile/resource_logo-d13e8cd1113fac484b6d88297ed7b840.png"
          },
          {
            "key": "WAVES",
            "logo": "https://s3.eu-central-1.amazonaws.com/bcwallet/mobile/resource_logo-c0f42fe6037e2ef5ac464d84fa8bcdab.png"
          }
        ],
        "partner_projects": [
          {
            "key": "ZCH",
            "logo": "https://s3.eu-central-1.amazonaws.com/bcwallet/mobile/resource_logo-d13e8cd1113fac484b6d88297ed7b840.png"
          },
          {
            "key": "WAVES",
            "logo": "https://s3.eu-central-1.amazonaws.com/bcwallet/mobile/resource_logo-c0f42fe6037e2ef5ac464d84fa8bcdab.png"
          }
        ],
        "social_activity": [
          {
            "logo": "https://s3.eu-central-1.amazonaws.com/bcwallet/mobile/resource_logo-c0f42fe6037e2ef5ac464d84fa8bcdab.png",
            "date": "30.05.18, 19:23",
            "text": "blablabla"
          },
          {
            "logo": "https://s3.eu-central-1.amazonaws.com/bcwallet/mobile/resource_logo-c0f42fe6037e2ef5ac464d84fa8bcdab.png",
            "date": "30.05.18, 19:23",
            "text": "blablabla"
          },
          {
            "logo": "https://s3.eu-central-1.amazonaws.com/bcwallet/mobile/resource_logo-c0f42fe6037e2ef5ac464d84fa8bcdab.png",
            "date": "30.05.18, 19:23",
            "text": "blablabla"
          }
        ]
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
