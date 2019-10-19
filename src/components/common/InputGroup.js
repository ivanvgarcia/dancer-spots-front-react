import React from "react";
import classnames from "classnames";
import PropTypes from "prop-types";

const InputGroup = ({
  name,
  placeholder,
  type,
  icon,
  error,
  onChange,
  value
}) => {
  return (
    <div className="field">
      <div className="control has-icons-left">
        <input
          className={classnames("input", {
            "is-danger": error
          })}
          placeholder={placeholder}
          name={name}
          onChange={onChange}
          value={value}
        />
        <span className="icon is-left">
          <i className={icon} />
        </span>
      </div>
      {error && (
        <span className="icon is-small is-right">
          <i className="fas fa-exclamation-triangle" />
          <p className="help is-danger">{error}</p>
        </span>
      )}
    </div>
  );
};

InputGroup.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  icon: PropTypes.string,
  error: PropTypes.string,
  value: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
};

InputGroup.defaultProps = {
  type: "text"
};

export default InputGroup;
