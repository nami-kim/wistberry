import {
  TOGGLE_MODAL_OPEN
} from '../actions/types';

const initialState = {
  modalIsOpen: false,
  cart: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_MODAL_OPEN:
      return {
        ...state,
        modalIsOpen: !state.modalIsOpen
      };

    default:
      return state;
  }
};
