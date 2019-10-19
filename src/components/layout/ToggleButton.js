import React from "react";

const ToggleButton = ({ click }) => {
  return (
    <button
      onClick={click}
      className="navbar-burger burger"
      aria-label="menu"
      aria-expanded="false"
      data-target="navbarBasicExample"
      style={{ background: "none", border: "none" }}
    >
      <span aria-hidden="true" />
      <span aria-hidden="true" />
      <span aria-hidden="true" />
    </button>
  );
};

export default ToggleButton;
