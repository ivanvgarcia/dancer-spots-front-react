import {
  GET_VENUE,
  GET_VENUES,
  VENUE_LOADING,
  CLEAR_CURRENT_VENUE,
  GET_USER_VENUES,
  FILTER_VENUES
} from "../actions/types";

const initialState = {
  venue: null,
  venues: null,
  loadingVenue: false,
  filteredByName: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case VENUE_LOADING:
      return {
        ...state,
        loadingVenue: true
      };
    case GET_VENUE:
      return {
        ...state,
        venue: action.payload,
        loadingVenue: false
      };
    case GET_USER_VENUES:
      return {
        ...state,
        venues: action.payload,
        loadingVenue: false
      };
    case GET_VENUES:
      return {
        ...state,
        venues: action.payload,
        loadingVenue: false
      };
    case CLEAR_CURRENT_VENUE:
      return {
        ...state,
        venue: null
      };
    case FILTER_VENUES:
      return {
        ...state,
        filteredByName: action.payload
      };
    default:
      return state;
  }
}
