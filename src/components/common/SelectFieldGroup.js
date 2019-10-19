import React from "react";
import classnames from "classnames";
import PropTypes from "prop-types";
import Select from "react-select";
import makeAnimated from "react-select/lib/animated";

const SelectFieldGroup = ({
  name,
  placeholder,
  value,
  error,
  onChange,
  label,
  labelText,
  className,
  defaultOptions,
  isMulti = true,
  options
}) => {
  return (
    <div className="field">
      <div className="control">
        <label htmlFor={label} className="label has-text-weight-light">
          {labelText}
        </label>
        <Select
          className={classnames(
            { className },
            {
              "is-danger": error
            }
          )}
          closeMenuOnSelect={false}
          components={makeAnimated()}
          defaultValue={defaultOptions}
          placeholder={placeholder}
          name={name}
          value={value}
          onChange={onChange}
          isMulti={isMulti}
          options={options}
          classNamePrefix="select"
        />
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

SelectFieldGroup.propTypes = {
  placeholder: PropTypes.string,
  error: PropTypes.string,
  label: PropTypes.string.isRequired,
  labelText: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
};

export default SelectFieldGroup;
