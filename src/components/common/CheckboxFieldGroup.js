import React from "react";
import PropTypes from "prop-types";

const CheckboxFieldGroup = ({ value, onChange, type, name, label }) => {
  return (
    <div className="field">
      <div className="control">
        <label className="checkbox">
          <input type={type} name={name} value={value} onChange={onChange} />{" "}
          {label}
        </label>
      </div>
    </div>
  );
};

CheckboxFieldGroup.propTypes = {
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired
};

CheckboxFieldGroup.defaultProps = {
  type: "checkbox"
};

export default CheckboxFieldGroup;
