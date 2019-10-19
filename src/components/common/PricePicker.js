import React from "react";
import classnames from "classnames";
import PropTypes from "prop-types";
import StarRatingComponent from "react-star-rating-component";

const PricePicker = ({
  name,
  value,
  onStarClick,
  label,
  labelText,
  error,
  type,
  info
}) => {
  return (
    <div className="field">
      <label htmlFor={label} className="label has-text-weight-light">
        {labelText}
      </label>
      <div className="control">
        <StarRatingComponent
          name={name}
          startCount="4"
          value={value}
          onStarClick={onStarClick}
          type={type}
          className={classnames({
            "is-danger": error
          })}
          starColor="#21cc67"
          starCount={4}
          renderStarIcon={() => (
            <span>
              <i className="fas fa-money-bill-alt" />
            </span>
          )}
        />
        <p className="help is-primary">{info}</p>
        {error && (
          <span className="icon is-small is-right">
            <i className="fas fa-exclamation-triangle" />
            <p className="help is-danger">{error}</p>
          </span>
        )}
      </div>
    </div>
  );
};

PricePicker.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.number.isRequired,
  error: PropTypes.string,
  label: PropTypes.string.isRequired,
  info: PropTypes.string
};

export default PricePicker;
