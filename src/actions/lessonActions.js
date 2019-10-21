import { dancerspotsAPI } from '../config/baseUrl';
import {
  GET_LESSON,
  GET_USER_LESSONS,
  GET_ALL_INSTRUCTOR_LESSONS,
  GET_ONE_INSTRUCTOR_LESSONS,
  GET_LESSONS,
  LESSON_LOADING,
  GET_ERRORS,
  CLEAR_ERRORS,
  CLEAR_CURRENT_LESSON,
  LESSON_SIGNUP,
  LESSON_APPROVAL,
  CLEAR_ALERT
} from '../actions/types';

// Add lesson
export const addLesson = (lessonData, history) => async dispatch => {
  try {
    await dancerspotsAPI.post('/lessons', lessonData);
    window.location = '/lessons/all';
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    });
  }
};

// Edit lesson
export const editLesson = (lessonData, id, history) => async dispatch => {
  try {
    await dancerspotsAPI.patch(`/lessons/${id}`, lessonData);

    history.replace('/lessons/all');
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    });
  }
};

// // Delete an event
// export const deleteEvent = id => dispatch => {
//   if (
//     window.confirm(
//       'Are you sure you want to delete this event? This cannot be undone.'
//     )
//   ) {
//     dancerspotsAPI
//       .delete(`/events/eventid/${id}`)
//       .then(res =>
//         dispatch({
//           type: GET_EVENTS,
//           payload: res.data
//         })
//       )
//       .catch(err =>
//         dispatch({
//           type: GET_ERRORS,
//           payload: err.response.data
//         })
//       );
//   }
// };

// Get lesson by id
export const getLesson = id => async dispatch => {
  try {
    dispatch(setLessonLoading());
    const res = await dancerspotsAPI.get(`/lessons/${id}`);
    dispatch({
      type: GET_LESSON,
      payload: res.data
    });
  } catch (error) {
    dispatch({
      type: GET_LESSON,
      payload: {}
    });
  }
};

// Get all instructors with lessons
export const getAllLessonsByInstructor = () => async dispatch => {
  dispatch(setLessonLoading());
  try {
    const res = await dancerspotsAPI.get('/lessons/');
    dispatch({
      type: GET_ALL_INSTRUCTOR_LESSONS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: GET_ALL_INSTRUCTOR_LESSONS,
      payload: null
    });
  }
};

// Get one instructors with lessons
export const getInstructorLessons = id => async dispatch => {
  try {
    const res = await dancerspotsAPI.get(`/lessons/instructor/${id}`);
    dispatch({
      type: GET_ONE_INSTRUCTOR_LESSONS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: GET_ONE_INSTRUCTOR_LESSONS,
      payload: null
    });
  }
};

// Get all lessons
export const getUserLessons = () => async dispatch => {
  try {
    const res = await dancerspotsAPI.get('/lessons/all');
    dispatch({
      type: GET_USER_LESSONS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: GET_LESSONS,
      payload: null
    });
  }
};

// Lesson Approval
export const lessonApproval = data => async dispatch => {
  try {
    const res = await dancerspotsAPI.post('/lessons/approval', data);
    dispatch({
      type: LESSON_APPROVAL,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    });
  }
};

// Lesson sign up
export const lessonSignUp = data => async dispatch => {
  try {
    const res = await dancerspotsAPI.post('/lessons/signup', data);
    dispatch({
      type: LESSON_SIGNUP,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    });
  }
};

// Lesson sign up
export const cancelLesson = data => async dispatch => {
  if (
    window.confirm(
      'Are you sure you want to cancel this lesson? This cannot be undone.'
    )
  ) {
    try {
      await dancerspotsAPI.post('/lessons/cancel-lesson', data);
    } catch (err) {
      console.log(err);
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    }
  }
};

// Clear lesson
export const clearCurrentLesson = () => {
  return {
    type: CLEAR_CURRENT_LESSON
  };
};

// Lesson loading
export const setLessonLoading = () => {
  return {
    type: LESSON_LOADING
  };
};

// Clear errors
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  };
};

// Clear alert
export const clearAlert = () => {
  return {
    type: CLEAR_ALERT
  };
};
