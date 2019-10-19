import React from "react";
import classnames from "classnames";
import PropTypes from "prop-types";

const TextFieldGroup = ({
  name,
  placeholder,
  value,
  label,
  labelText,
  error,
  type,
  onChange,
  info,
  autocomplete,
  disabled
}) => {
  return (
    <div className="field">
      <label htmlFor={label} className="label has-text-weight-light">
        {labelText}
      </label>
      <div className="control">
        <input
          type={type}
          className={classnames("input ", {
            "is-danger": error
          })}
          placeholder={placeholder}
          name={name}
          value={value}
          onChange={onChange}
          disabled={disabled}
          autoComplete={autocomplete}
        />
        <p className="help is-primary">{info}</p>
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

TextFieldGroup.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  error: PropTypes.string,
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  info: PropTypes.string,
  onChange: PropTypes.func.isRequired
};

TextFieldGroup.defaultProps = {
  type: "text"
};

export default TextFieldGroup;
