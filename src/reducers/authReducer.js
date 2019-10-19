import {
  SET_CURRENT_USER,
  GET_CURRENT_USER,
  FORGOT_PASSWORD,
  RESET_PASSWORD
} from '../actions/types';
import isEmpty from '../validation/is-empty';

const initialState = {
  isAuthenticated: false,
  sentEmail: false,
  user: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload
      };
    case GET_CURRENT_USER:
      return {
        ...state,
        user: action.payload
      };
    case FORGOT_PASSWORD:
      return {
        ...state,
        sentEmail: action.payload
      };
    case RESET_PASSWORD:
      return {
        ...state,
        sentEmail: action.payload
      };
    default:
      return state;
  }
}
