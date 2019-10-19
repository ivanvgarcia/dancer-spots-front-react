import React from "react";
import classnames from "classnames";
import PropTypes from "prop-types";

const FileUploadFieldGroup = ({
  name,
  value,
  label,
  labelText,
  error,
  type,
  onChange,
  info,
  disabled
}) => {
  return (
    <div className="file is-primary is-fullwidth padding-top-btm">
      <label htmlFor={label} className="file-label has-text-weight-light">
        <input
          type={type}
          className={classnames(" ", {
            "is-danger": error
          })}
          name={name}
          value={value}
          onChange={onChange}
          disabled={disabled}
        />
      </label>
      <p className="help is-primary">{info}</p>
      {error && (
        <div className="icon is-small is-right">
          <p className="help is-danger">
            {" "}
            <i className="fas fa-exclamation-triangle has-text-warning" />
            {error}
          </p>
        </div>
      )}
    </div>
  );
};

FileUploadFieldGroup.propTypes = {
  name: PropTypes.string.isRequired,
  error: PropTypes.string,
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  disabled: PropTypes.string,
  info: PropTypes.string,
  onChange: PropTypes.func.isRequired
};

FileUploadFieldGroup.defaultProps = {
  type: "file"
};

export default FileUploadFieldGroup;
