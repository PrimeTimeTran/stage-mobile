import {
  FACEBOOK_LOGIN_SUCCESS,
  FACEBOOK_LOGIN_FAIL,
  FACEBOOK_LOGOUT
} from '../actions/types'

export default (state = {}, action) => {
  switch (action.type) {
    case FACEBOOK_LOGIN_SUCCESS:
      return { token: action.payload }
    case FACEBOOK_LOGIN_FAIL:
      return { token: null }
    case FACEBOOK_LOGOUT:
      return { token: null }
    default:
      return state
  }
};
