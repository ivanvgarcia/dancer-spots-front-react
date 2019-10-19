import React from "react";
import classnames from "classnames";
import PropTypes from "prop-types";

const TextAreaFieldGroup = ({
  name,
  placeholder,
  value,
  error,
  onChange,
  label,
  labelText
}) => {
  return (
    <div className="field">
      <div className="control">
        <label htmlFor={label} className="label has-text-weight-light">
          {labelText}
        </label>
        <textarea
          className={classnames("textarea", {
            "is-danger": error
          })}
          placeholder={placeholder}
          name={name}
          value={value}
          onChange={onChange}
        />{" "}
        {error && (
          <span className="icon is-small is-right">
            <p className="help is-danger">
              {" "}
              <i className="fas fa-exclamation-triangle has-text-warning" />
              {error}
            </p>
          </span>
        )}
      </div>
    </div>
  );
};

TextAreaFieldGroup.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  error: PropTypes.string,
  label: PropTypes.string.isRequired,
  labelText: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
};

export default TextAreaFieldGroup;
