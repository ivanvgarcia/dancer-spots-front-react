import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { getLesson, clearCurrentLesson } from '../../actions/lessonActions';
import { Image, Transformation } from 'cloudinary-react';
import MetaTags from 'react-meta-tags';
import Moment from 'react-moment';
import Fade from 'react-reveal/Fade';
import Bounce from 'react-reveal/Bounce';

import Loader from '../common/Loader';

const ShowLesson = ({
  getLesson,
  clearCurrentLesson,
  lesson,
  user,
  ...props
}) => {
  useEffect(() => {
    getLesson(props.computedMatch.params.id);
  }, [getLesson, props, props.match.params.id]);

  useEffect(() => {
    clearCurrentLesson();
  }, [clearCurrentLesson]);

  return (
    <div>
      {!lesson ? (
        <Loader />
      ) : (
        <div className="lesson-show">
          <MetaTags>
            <title>
              {lesson.title} | {lesson.description}
            </title>
            <meta name="description" content={lesson.descrition} />
            <meta property="og:title" content={lesson.title} />
            <meta property="og:image" content={lesson.photo} />
          </MetaTags>
          <div className="section">
            <div className="container">
              <div className="columns">
                <div className="lesson-show__images column is-half">
                  <h1 className="lesson-show__title title is-1 has-text-weight-light">
                    {lesson.title}
                  </h1>
                  <Fade left>
                    <Image
                      cloudName={
                        process.env.REACT_APP_CLOUDINARY_API_CLOUD_NAME
                      }
                      publicId={lesson.photo}
                    >
                      <Transformation
                        width="700"
                        crop="fill"
                        dpr="auto"
                        gravity="auto"
                        quality="auto:best"
                        fetch_format="auto"
                        responsive
                      />
                    </Image>
                  </Fade>
                </div>

                <div className="lesson-show__information column is-half">
                  <Image
                    cloudName={process.env.REACT_APP_CLOUDINARY_API_CLOUD_NAME}
                    publicId={lesson.teacher.photo}
                    className="lesson-show__teacher"
                  >
                    <Transformation
                      width="200"
                      height="200"
                      crop="fill"
                      dpr="auto"
                      quality="auto:best"
                      fetch_format="auto"
                      responsive
                    />
                  </Image>
                  <div className="box">
                    <Bounce delay={1000}>
                      <div className="layer">
                        <p className="lesson-show__price">
                          Price {lesson.price}
                        </p>
                      </div>
                    </Bounce>

                    <h2 className="lesson-show__teacher-name title is-5 has-text-weight-bold">
                      <span>Instructor </span>
                      {lesson.teacher.name}
                    </h2>
                    {user && user.id === lesson.teacher._id && (
                      <Link to={`/lesson/edit/${lesson._id}`}>Edit Lesson</Link>
                    )}
                    <div className="lesson-show__metadata">
                      <div className="highlight">
                        <h3 className="lesson-show__date">
                          Lesson on <Moment format={'MMMM DD, YYYY'} />
                        </h3>
                      </div>

                      <div className="tags has-addons">
                        <p className="tag is-primary">
                          <Moment format="LT">{lesson.starttime}</Moment>
                        </p>
                        <p className="tag is-dark">
                          <Moment format="LT">{lesson.endtime}</Moment>
                        </p>
                      </div>
                    </div>
                    <p className="lesson-show__description">
                      {lesson.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = state => ({
  lesson: state.lesson.lesson,
  user: state.auth.user
});

export default connect(
  mapStateToProps,
  {
    getLesson,
    clearCurrentLesson
  }
)(withRouter(ShowLesson));
