import {
  GET_LESSON,
  GET_LESSONS,
  GET_ALL_INSTRUCTOR_LESSONS,
  GET_ONE_INSTRUCTOR_LESSONS,
  LESSON_LOADING,
  CLEAR_CURRENT_LESSON,
  GET_USER_LESSONS,
  LESSON_SIGNUP,
  CLEAR_ALERT
} from '../actions/types';

const initialState = {
  lesson: null,
  lessons: null,
  loadingLesson: true,
  instructorLessons: null,
  alert: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case LESSON_LOADING:
      return {
        ...state,
        loadingLesson: true
      };
    case GET_LESSON:
      return {
        ...state,
        lesson: action.payload,
        loadingLesson: false
      };
    case GET_USER_LESSONS:
      return {
        ...state,
        lessons: action.payload,
        loadingLesson: false
      };
    case GET_LESSONS:
      return {
        ...state,
        lessons: action.payload,
        loadingLesson: false
      };
    case GET_ALL_INSTRUCTOR_LESSONS:
      return {
        ...state,
        lessons: action.payload,
        loadingLesson: false
      };
    case GET_ONE_INSTRUCTOR_LESSONS:
      return {
        ...state,
        instructorLessons: action.payload,
        loadingLesson: false
      };
    case LESSON_SIGNUP:
      return {
        ...state,
        alert: action.payload
      };
    case CLEAR_ALERT:
      return { ...state, alert: {} };
    case CLEAR_CURRENT_LESSON:
      return {
        ...state,
        lesson: null
      };
    default:
      return state;
  }
}
