import { combineReducers } from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import profileReducer from './profileReducer';
import eventReducer from './eventReducer';
import venueReducer from './venueReducer';
import lessonReducer from './lessonReducer';

export default combineReducers({
  auth: authReducer,
  profile: profileReducer,
  event: eventReducer,
  venue: venueReducer,
  lesson: lessonReducer,
  errors: errorReducer
});
