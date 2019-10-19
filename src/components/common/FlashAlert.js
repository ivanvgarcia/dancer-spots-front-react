import React from 'react';
import PropTypes from 'prop-types';
import isEmpty from '../../validation/is-empty';

const FlashAlert = ({ alert, errors }) => {

  const renderMessage = () => {
    if (!isEmpty(alert)) {
      return <p className="alert">{alert.success}</p>;
    } else if (!isEmpty(errors)) {
      return <p className="errors">{errors.msg}</p>;
    }
  };
  return <div className="flash-alert">{renderMessage()}</div>;
};

FlashAlert.propTypes = {
  alert: PropTypes.object,
  errors: PropTypes.object
};

export default FlashAlert;
