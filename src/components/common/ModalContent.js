import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Image, Transformation } from 'cloudinary-react';
import FlashAlert from './FlashAlert';
import isEmpty from '../../validation/is-empty';

const ModalContent = ({
  title,
  description,
  teacherImage,
  data,
  handleHide,
  handleSignUp,
  alert,
  errors,
  isLoading
}) => {
  const isSent = !(!isEmpty(alert) || !isEmpty(errors));
  return (
    <div className="modal">
      <Image
        cloudName={process.env.REACT_APP_CLOUDINARY_API_CLOUD_NAME}
        publicId={data.photo}
      >
        <Transformation
          width="50"
          height="50"
          crop="fill"
          dpr="auto"
          radius="max"
          gravity="face"
          quality="auto:best"
          fetch_format="auto"
          responsive
        />
      </Image>{' '}
      <h1 className="modal__title title is-2 has-text-primary">{title}</h1>
      <div className="subtitle">
        Lesson taught by <Link to={`/profile/d${data._id}`}>{data.name}</Link>{' '}
      </div>
      <FlashAlert alert={alert} errors={errors} />
      <p className="modal__description text-flow">{description}</p>
      <div className="modal__actions">
        {isSent && (
          <button
            onClick={handleSignUp}
            className={`button is-success ${isLoading.loading}`}
            disabled={isLoading.disabled}
          >
            Confirm
          </button>
        )}
        <button className="button is-danger" onClick={handleHide}>
          {isSent ? 'Cancel' : 'Close'}
        </button>
      </div>
    </div>
  );
};

ModalContent.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  data: PropTypes.object,
  handleHide: PropTypes.func.isRequired
};

export default ModalContent;
