import React from 'react';
import {
  FacebookShareButton,
  WhatsappShareButton,
  RedditShareButton,
  LineShareButton,
  EmailShareButton
} from 'react-share';
import {
  FacebookIcon,
  WhatsappIcon,
  RedditIcon,
  LineIcon,
  EmailIcon
} from 'react-share';

const SocialMediaButtons = ({ event, venue }) => {
  const url = event
    ? `https://www.dancerspots.com/event/${event}`
    : `https://www.dancerspots.com/venue/${venue}`;

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        margin: ".4em 0"
      }}
    >
      <FacebookShareButton
        url={url}
        className=""
        style={{ margin: '.5em', cursor: 'pointer' }}
      >
        <FacebookIcon size={40} round={true} />
      </FacebookShareButton>
      <RedditShareButton
        url={url}
        className=""
        style={{ margin: '.5em', cursor: 'pointer' }}
      >
        <RedditIcon size={40} round={true} />
      </RedditShareButton>
      <WhatsappShareButton
        url={url}
        className=""
        style={{ margin: '.5em', cursor: 'pointer' }}
      >
        <WhatsappIcon size={40} round={true} />
      </WhatsappShareButton>
      <LineShareButton
        url={url}
        className=""
        style={{ margin: '.5em', cursor: 'pointer' }}
      >
        <LineIcon size={40} round={true} />
      </LineShareButton>
      <EmailShareButton
        url={url}
        className=""
        style={{ margin: '.5em', cursor: 'pointer' }}
      >
        <EmailIcon size={40} round={true} />
      </EmailShareButton>
    </div>
  );
};

export default SocialMediaButtons;
