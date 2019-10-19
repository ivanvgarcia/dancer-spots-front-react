import React from 'react';
import { ReactComponent as Salsa } from './salsa.svg';
import { Link } from 'react-router-dom';

export default () => {
  return (
    <div className="section">
      <div className="columns is-centered">
        <div className="column is-half">
          <Salsa style={{ width: '100%' }} />
          <h1 className="title is-2 has-text-centered">404 - Page Not Found</h1>
          <p className="subtite is-spaced has-text-centered is-size-5">
            Sorry, there's nothing here! Shimmy on out of here!
          </p>
          <div className="buttons is-grouped padding-top-btm is-centered">
            <Link to="/profiles/all" className="button is-primary">
              Profiles
            </Link>

            <Link to="/events/all" className="button is-warning has-text-dark">
              Events
            </Link>

            <Link to="/venues/all" className="button is-danger">
              Venues
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
