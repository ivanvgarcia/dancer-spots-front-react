import React from 'react';
import Zoom from 'react-reveal/Zoom';
import Accordion from '../common/Accordion';
import LessonAccordionContent from './LessonAccordionContent';

const LessonRow = ({ lesson }) => {
  return (
    <Zoom delay={300}>
      <Accordion
        title={lesson.title}
        link={lesson._id}
        tagOne={lesson.price}
        tagTwo={lesson.dance}
        content={<LessonAccordionContent lesson={lesson} />}
      />
    </Zoom>
  );
};

export default LessonRow;
