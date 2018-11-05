import { SET_USER, RESET_USER } from '../actions/types';

const initialState = {
  firstname: '',
  lastname: '',
  email: '',
  orderHistory: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        ...action.user
      };
    case RESET_USER:
      return initialState;
    default:
      return state;
  }
};
