import React, { useState } from 'react';
import { Image, Transformation } from 'cloudinary-react';
import { connect } from 'react-redux';
import { lessonApproval } from '../../actions/lessonActions';

const AccordionContent = ({ lesson, student, idx, lessonApproval }) => {
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleMouseEnter = (evt, approved) => {
    if (approved && !submitted) {
      evt.target.textContent = 'Remove Student?';
    } else if (!approved && !submitted) {
      evt.target.textContent = 'Approve Student?';
    }
  };

  const handleMouseLeave = (evt, approved) => {
    if (approved & !submitted) {
      evt.target.textContent = 'Taking Lessons';
    } else if (!approved && !submitted) {
      evt.target.textContent = 'Awaiting Approval';
    }
  };

  const handleClick = async (lesson, student, idx) => {
    setIsLoading(true);
    const data = { lesson: lesson._id, student: student.studentId };
    await lessonApproval(data);
    setIsLoading(false);
    setSubmitted(true);
  };

  const buttonText = () => {
    if (student.approved && !submitted) {
      return 'Taking Lesson';
    } else if (student.approved && submitted) {
      return 'Student Removed';
    } else if (!student.approved && !submitted) {
      return 'Awaiting Approval';
    } else if (!student.approved && submitted) {
      return 'Student Approved';
    }
  };

  return (
    <div key={student.studentId} className="column content-is-centered">
      <strong>{idx + 1} </strong>
      <Image
        cloudName={process.env.REACT_APP_CLOUDINARY_API_CLOUD_NAME}
        publicId={student.photo}
      >
        <Transformation
          width="40"
          height="40"
          crop="fill"
          radius="max"
          gravity="faces"
          quality="auto:best"
          fetch_format="auto"
          responsive
        />
      </Image>
      <p>{student.name}</p>
      <button
        onMouseEnter={evt => handleMouseEnter(evt, student.approved)}
        onMouseLeave={evt => handleMouseLeave(evt, student.approved)}
        onClick={() => handleClick(lesson, student, idx)}
        className={`button is-small ${
          student.approved ? 'is-success' : 'is-warning'
        } ${isLoading && 'is-loading'}`}
        disabled={submitted}
      >
        {buttonText()}
      </button>
    </div>
  );
};

export default connect(
  null,
  { lessonApproval }
)(AccordionContent);
