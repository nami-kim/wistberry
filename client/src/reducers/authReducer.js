import { SET_AUTH_USER } from '../actions/types'
import isEmpty from '../validation/is-empty'

const initialState = {
  isAuthenticated: false,
  authUser: {}
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_AUTH_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.decoded),
        authUser: action.decoded
      }
    default:
      return state;
  }
};
