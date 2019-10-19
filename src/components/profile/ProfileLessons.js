import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  getAllLessonsByInstructor,
  getUserLessons,
  getInstructorLessons,
  lessonApproval
} from '../../actions/lessonActions';
import ProfileColumnRBox from '../profile/ProfileColumnRBox';
import Accordion from '../common/Accordion';
import AccordionContent from './AccordionContent';
import LessonAccordionContent from '../lessons/LessonAccordionContent';
import Loader from '../common/Loader';

const ProfileLessons = ({
  user,
  lessons,
  instructor,
  getInstructorLessons
}) => {
  useEffect(() => {
    getInstructorLessons(instructor._id);
  }, [getInstructorLessons, instructor._id]);

  const renderAccordionContent = lesson => {
    if (instructor._id === user.id) {
      return (
        <div className="columns">
          {lesson.students.map((student, idx) => (
            <AccordionContent
              key={student.studentId}
              lesson={lesson}
              student={student}
              idx={idx}
            />
          ))}
        </div>
      );
    } else {
      return <LessonAccordionContent lesson={lesson} />;
    }
  };

  const renderContent = () => {
    if (!lessons) {
      return <Loader />;
    } else {
      if (!lessons.length) {
        return (
          <div className="column is-full is-size-5 is-size-6-mobile small-margin-top-btm content-is-centered">
            {instructor.name} has not added any lessons.
          </div>
        );
      } else {
        return lessons.map(lesson => (
          <div key={lesson._id} className="column is-half">
            <Accordion
              title={lesson.title}
              link={lesson._id}
              tagOne={lesson.price}
              tagTwo={lesson.dance}
              content={renderAccordionContent(lesson)}
              open={lesson.students.length > 0 && true}
            />
          </div>
        ));
      }
    }
  };

  const addLessonButton = () => {
    return (
      instructor._id === user.id && (
        <Link to="/lesson/add" className="button is-primary is-medium">
          <span className="icon">
            <i className="fas fa-plus" />
          </span>
          <span>Add Lesson</span>
        </Link>
      )
    );
  };

  return (
    <ProfileColumnRBox
      title={'Lessons'}
      user={instructor}
      renderContent={renderContent()}
      addButton={addLessonButton()}
    />
  );
};

const mapStateToProps = state => ({
  user: state.auth.user,
  lessons: state.lesson.instructorLessons
});

export default connect(
  mapStateToProps,
  {
    getAllLessonsByInstructor,
    getUserLessons,
    getInstructorLessons,
    lessonApproval
  }
)(ProfileLessons);
