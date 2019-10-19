import React from "react";
import UserProfileCardList from "./UserProfileCardList";
import Header from "../common/Header";
import MetaTags from "react-meta-tags";

const AllProfiles = props => {
  const {
    title = "All Profiles",
    description = "Find new dancers and ask around for the next best spot to dance anywhere around the world."
  } = props;

  return (
    <div>
      {" "}
      <MetaTags>
        <title>Profiles | {description}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={title} />
      </MetaTags>
      <Header
        title={title}
        subtitle={description}
        color="is-dark is-bold"
        icon="fas fa-users"
      />
      <div className="is-divider" />
      <UserProfileCardList />
    </div>
  );
};

export default AllProfiles;
