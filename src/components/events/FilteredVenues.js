import React from 'react';
import { Image, Transformation } from 'cloudinary-react';

const FilteredVenues = ({ venue, onVenueClick }) => {
  return (
    <div onClick={onVenueClick} className="filtered-venues">
      <div className="columns">
        <div className="column is-2">
          <Image
            cloudName={process.env.REACT_APP_CLOUDINARY_API_CLOUD_NAME}
            publicId={venue.photo}
          >
            <Transformation
              width="50"
              height="50"
              crop="fill"
              dpr="auto"
              quality="auto:best"
              fetch_format="auto"
              responsive
            />
          </Image>
        </div>
        <div className="column is-10">
          <h3 className="filtered-venues__title">{venue.name}</h3>
          <p className="filtered-venues__address">{venue.address}</p>
        </div>
      </div>
    </div>
  );
};

export default FilteredVenues;
