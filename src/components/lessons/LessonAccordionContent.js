import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Image, Transformation } from 'cloudinary-react';
import Moment from 'react-moment';
import Modal from '../common/Modal';
import ModalContent from '../common/ModalContent';
import {
  lessonSignUp,
  clearErrors,
  cancelLesson,
  clearAlert
} from '../../actions/lessonActions';
import isEmpty from '../../validation/is-empty';

const LessonAccordionContent = ({
  user,
  lesson,
  alert,
  errors,
  lessonSignUp,
  clearErrors,
  cancelLesson,
  clearAlert,
  isAuthenticated
}) => {
  const [submitted, setSubmitted] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState({
    loading: '',
    disabled: false
  });

  const handleShow = () => {
    setShowModal(true);
  };

  const handleHide = () => {
    setShowModal(false);
    setIsLoading({ loading: '', disabled: false });
    clearErrors();
    clearAlert();
  };

  const handleSignUp = async () => {
    setIsLoading({ loading: 'is-loading', disabled: true });
    const data = {
      lesson
    };
    await lessonSignUp(data);
    setSubmitted(true);
  };

  useEffect(() => {
    if (!isEmpty(alert) || !isEmpty(errors)) {
      setIsLoading({ loading: '' });
    }
  }, [alert, errors]);

  const handleLessonCancel = () => {
    setIsLoading({ loading: 'is-loading', disabled: true });
    cancelLesson(lesson);
    setSubmitted(true);
    setIsLoading({ loading: '' });
  };

  const renderModal = showModal ? (
    <Modal>
      <ModalContent
        title={`Sign up for ${lesson.title}`}
        description={`Are you sure you would like to send an email to ${
          lesson.teacher.name
        } about joining his or her lesson?`}
        data={lesson.teacher}
        handleHide={handleHide}
        handleSignUp={handleSignUp}
        isLoading={isLoading}
        alert={alert}
        errors={errors}
      />
    </Modal>
  ) : (
    ''
  );

  const checkUserLessons = () => {
    const foundStudent = lesson.students.filter(
      student => student.studentId === user.id
    );
    return foundStudent.length ? true : false;
  };

  return (
    <div className="message-body">
      <span>
        On <Moment format="MMMM DD, YYYY">{lesson.lessondate}</Moment>
      </span>
      <Image
        cloudName={process.env.REACT_APP_CLOUDINARY_API_CLOUD_NAME}
        publicId={lesson.photo}
      >
        <Transformation
          width="400"
          height="400"
          crop="fill"
          dpr="auto"
          quality="auto:best"
          fetch_format="auto"
          responsive
        />
      </Image>
      <div className="lesson-card__venue-info">
        <div className="lesson-card__description margin-top-btm">
          <h4 className="title is-6 is-marginless">About {lesson.title}</h4>
          <p>{lesson.description}</p>
        </div>
        <Link to={`/venue/${lesson.venue._id}`}>@{lesson.venue.name}</Link>
        <p>{lesson.venue.address}</p>
        <Moment format="LT">{lesson.starttime}</Moment> -{' '}
        <Moment format="LT">{lesson.endtime}</Moment>
      </div>
      {isAuthenticated ? (
        checkUserLessons() ? (
          <button
            className={`button is-danger ${isLoading.loading} margin-top-btm`}
            onClick={handleLessonCancel}
            disabled={submitted}
          >
            {submitted ? 'Cancelled' : 'Cancel Lesson'}
          </button>
        ) : (
          <button
            className="button is-primary margin-top-btm"
            onClick={handleShow}
            disabled={submitted}
          >
            {submitted ? 'Registered!' : 'Register'}
          </button>
        )
      ) : (
        <Link to="/login" className="has-text-centered has-text-primary margin-top-btm">
          Login or Sign Up to Join Lessons
        </Link>
      )}

      {renderModal}
    </div>
  );
};

const mapStateToProps = state => ({
  user: state.auth.user,
  isAuthenticated: state.auth.isAuthenticated,
  alert: state.lesson.alert,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { lessonSignUp, clearErrors, clearAlert, cancelLesson }
)(LessonAccordionContent);
