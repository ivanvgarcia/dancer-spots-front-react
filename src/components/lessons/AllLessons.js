import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getAllLessonsByInstructor } from '../../actions/lessonActions';
import Loader from '../common/Loader';
import Header from '../common/Header';
import MetaTags from 'react-meta-tags';
import LessonCard from './LessonCard';

const AllLessons = ({
  lessons,
  getAllLessonsByInstructor,
  loadingLesson,
  title,
  description
}) => {
  useEffect(() => {
    if (!lessons) {
      getAllLessonsByInstructor();
    }
  }, [getAllLessonsByInstructor, lessons]);

  const renderLessons = () => {
    let allLessons;
    if (loadingLesson && !lessons) {
      allLessons = <Loader />;
    } else {
      if (lessons) {
        allLessons = lessons.map(lessonInfo => (
          <LessonCard key={lessonInfo.instructor._id} lesson={lessonInfo} />
        ));
      } else {
        allLessons = <h2>No lessons</h2>;
      }
    }
    return allLessons;
  };

  return (
    <div>
      {' '}
      <MetaTags>
        <title>
          {title} | {description}
        </title>
        <meta name="description" content={description} />
        <meta property="og:title" content={title} />
      </MetaTags>
      <Header
        title={title}
        subtitle={description}
        color="is-dark is-bold"
        icon="far fa-calendar-alt"
      />
      <div className="all-lessons">
        <div className="section">
          <div className="container">
            <div className="columns is-multiline">{renderLessons()}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

AllLessons.defaultProps = {
  title: 'Lessons',
  description:
    'Want to learn how to dance? Find an instructor to teach you anything from Bachata to Hip Hop.'
};

const mapStateToProps = state => ({
  lessons: state.lesson.lessons,
  loadingLesson: state.lesson.loadingLesson
});

export default connect(
  mapStateToProps,
  { getAllLessonsByInstructor }
)(AllLessons);
