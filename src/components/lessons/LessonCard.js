import React from 'react';
import { Image, Transformation } from 'cloudinary-react';
import { Link } from 'react-router-dom';
import { pluralize } from '../../helpers/pluralize';
import LessonRow from './LessonRow';
import Fade from 'react-reveal/Fade';

const LessonCard = ({ lesson }) => {
  const lessonsTaught = lesson.lessons.length;

  return (
    <Fade left>
      <div className="column is-half">
        <div className="lesson-card">
          <div className="lesson-card__header">
            <div className="lesson-card__teacher content-is-centered">
              <Image
                cloudName={process.env.REACT_APP_CLOUDINARY_API_CLOUD_NAME}
                publicId={lesson.instructor.photo}
              >
                <Transformation
                  width="100"
                  height="100"
                  crop="fill"
                  dpr="auto"
                  quality="auto:best"
                  fetch_format="auto"
                  responsive
                />
              </Image>
              <Link
                to={`/profile/${lesson.instructor._id}`}
                className="title is-3 has-text-white"
              >
                {lesson.instructor.name}
              </Link>
            </div>
            <h2 className="lesson-card__taught title is-3 has-text-primary content-is-centered">
              {`${lessonsTaught} ${pluralize(lessonsTaught, 'lesson')}`}
            </h2>
          </div>

          <div className="lesson-card__lessons">
            <h3 className="title is-3">Lessons</h3>
            {lesson.lessons.length ? (
              lesson.lessons.map(lesson => (
                <LessonRow key={lesson._id} lesson={lesson} />
              ))
            ) : (
              <div className="small-margin-top-btm">
                This instructor does not have any lessons yet.
              </div>
            )}
          </div>
        </div>
      </div>
    </Fade>
  );
};

export default LessonCard;
