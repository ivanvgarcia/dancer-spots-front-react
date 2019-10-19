import React from "react";
import classnames from "classnames";
import PropTypes from "prop-types";
import "rc-time-picker/assets/index.css";
import TimePicker from "rc-time-picker";

const TimePickerField = ({
  name,
  placeholder,
  value,
  label,
  labelText,
  error,
  onChange,
  format,
  info
}) => {
  return (
    <div className="field is-marginless">
      <label htmlFor={label} className="label has-text-weight-light">
        {labelText}
      </label>
      <div className="control">
        <TimePicker
          className={classnames({
            "is-danger": error
          })}
          placeholder={placeholder}
          name={name}
          value={value}
          onChange={onChange}
          format={format}
          use12Hours
          showSecond={false}
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

TimePickerField.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.object,
  error: PropTypes.string,
  label: PropTypes.string.isRequired,
  disabled: PropTypes.string,
  info: PropTypes.string,
  onChange: PropTypes.func.isRequired
};

TimePickerField.defaultProps = {
  type: "text"
};

export default TimePickerField;
