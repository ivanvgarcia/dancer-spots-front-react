import React, { Component } from "react";
import CommentInput from "../common/CommentInput";
import ShowProfileComments from "./ShowProfileComments";

class ProfileCommentList extends Component {
  render() {
    return (
      <div className="column is-full">
        <div className="box">
          <ShowProfileComments />
          <div className="margin-top-bottom">
            <CommentInput />
          </div>
        </div>
      </div>
    );
  }
}

export default ProfileCommentList;
