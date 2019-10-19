import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const TextEditor = ({ onChange, value, error, label, labelText, info }) => {
  return (
    <div className="field">
      <div className="control">
        <label htmlFor={label} className="label has-text-weight-light">
          {labelText}
        </label>
        <ReactQuill value={value} onChange={onChange} />
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

export default TextEditor;
