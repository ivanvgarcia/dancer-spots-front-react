import {
  GET_EVENT,
  GET_EVENTS,
  EVENT_LOADING,
  CLEAR_CURRENT_EVENT
} from "../actions/types";

const initialState = {
  event: null,
  events: null,
  loadingEvent: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case EVENT_LOADING:
      return {
        ...state,
        loadingEvent: true
      };
    case GET_EVENT:
      return {
        ...state,
        event: action.payload,
        loadingEvent: false
      };
    case GET_EVENTS:
      return {
        ...state,
        events: action.payload,
        loadingEvent: false
      };
    case CLEAR_CURRENT_EVENT:
      return {
        ...state,
        event: null
      };
    default:
      return state;
  }
}
