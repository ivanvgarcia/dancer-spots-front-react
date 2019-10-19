import React from 'react';
import Dropzone from 'react-dropzone';
import { Image, Transformation } from 'cloudinary-react';

const PhotoUpload = ({
  drop,
  photo,
  user,
  profile,
  label,
  labelText,
  error
}) => {
  let renderImage;
  if (photo && photo.match(/upload/)) {
    renderImage = (
      <img
        src={`/${photo}`}
        alt="Preview"
        style={{ width: '300px', height: 'auto' }}
      />
    );
  } else if (user && profile && profile.user.photo === photo) {
    renderImage = (
      <Image
        cloudName={process.env.REACT_APP_CLOUDINARY_API_CLOUD_NAME}
        publicId={profile.user.photo}
      >
        <Transformation
          width="300"
          height="300"
          crop="fill"
          quality="auto:best"
          fetch_format="auto"
          responsive
        />
      </Image>
    );
  } else {
    renderImage = (
      <Image
        cloudName={process.env.REACT_APP_CLOUDINARY_API_CLOUD_NAME}
        publicId={photo}
      >
        <Transformation
          width="300"
          height="300"
          crop="fill"
          quality="auto:best"
          fetch_format="auto"
          responsive
        />
      </Image>
    );
  }

  return (
    <Dropzone onDrop={drop}>
      {({ getRootProps, getInputProps }) => (
        <div className="field">
          <div className="control">
            <label htmlFor={label} className="label has-text-weight-light">
              {labelText}
            </label>
            <div {...getRootProps()}>
              <input {...getInputProps()} name="photo" />
              <div
                className="button is-primary is-inverted is-fullwidth"
                style={{
                  height: 'auto',
                  display: 'flex',
                  flexDirection: 'column'
                }}
              >
                <h4>Drag and Drop or Upload a Photo</h4>
                {renderImage}
              </div>
            </div>
          </div>
          {error && (
            <span className="icon is-small is-right">
              <p className="help is-danger">
                {' '}
                <i className="fas fa-exclamation-triangle has-text-warning" />
                {error}
              </p>
            </span>
          )}
        </div>
      )}
    </Dropzone>
  );
};

export default PhotoUpload;
