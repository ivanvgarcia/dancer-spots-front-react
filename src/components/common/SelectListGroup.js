import React from "react";
import classnames from "classnames";
import PropTypes from "prop-types";

const SelectListGroup = ({ name, value, error, onChange, options }) => {
  const selectOptions = options.map(option => (
    <option key={option.label} value={option.value}>
      {option.label}
    </option>
  ));
  return (
    <div className="field">
      <div className="control">
        <select
          className={classnames("input", {
            "is-danger": error
          })}
          name={name}
          value={value}
          onChange={onChange}
        >
          {selectOptions}
        </select>
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

SelectListGroup.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  error: PropTypes.string,
  options: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired
};

export default SelectListGroup;
