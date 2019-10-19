import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { upperCaseFirst } from '../../helpers/uppercase';
import Zoom from 'react-reveal/Zoom';

const Accordion = ({
  link,
  title,
  tagOne,
  tagTwo,
  content,
  color = 'is-light'
}) => {
  const [displayInfo, setDisplayInfo] = useState(false);

  return (
    <div className="lesson-card">
      <article
        className={`lesson-card__lesson message small-margin-top-btm ${color}`}
      >
        <div className="message-header">
          <Link
            to={`/lesson/${link}`}
            className="lesson-card__title title is-5 has-text-primary is-marginless"
          >
            {title}
          </Link>
          <p className="tag is-primary">{tagOne}</p>
          <p className="tag is-success">{tagTwo && upperCaseFirst(tagTwo)}</p>

          <button
            onClick={() => setDisplayInfo(!displayInfo)}
            className="button"
          >
            <span className="icon is-small">
              <i className="fas fa-caret-down" />
            </span>
          </button>
        </div>
        {displayInfo && <Zoom>{content}</Zoom>}
      </article>
    </div>
  );
};

export default Accordion;
