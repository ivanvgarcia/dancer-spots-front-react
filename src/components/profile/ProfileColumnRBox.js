import React from "react";

const ProfileColumnRBox = props => {
  return (
    <div className="column is-full">
      <h2 className="title is-3 is-size-5-mobile has-text-centered has-text-primary">
        {props.user.name}'s Posted {props.title}
      </h2>
      <div className="box">
        <div className="columns is-multiline">{props.renderContent}</div>
        <div className="column is-full content-is-centered">
          {props.addButton}
        </div>
      </div>
    </div>
  );
};

export default ProfileColumnRBox;
