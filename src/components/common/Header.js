import React from "react";

function Header({ title, icon, subtitle, color }) {
  return (
    <header className={`hero ${color}`}>
      <div className="hero-body">
        <div className="container">
          <h1 className="title is-2 is-size-3-mobile has-text-centered-mobile">
            <i className={icon} />
            {title}
          </h1>
          <h2 className="subtitle is-8 is-size-6-mobile">{subtitle}</h2>
        </div>
      </div>
    </header>
  );
}

export default Header;
