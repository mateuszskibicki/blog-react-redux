import React from "react";
import PropTypes from "prop-types";

const MultipleMediaSlice = ({ content }) => {
  if (!content) return null;

  const { title, button_title, button_url, media } = content;

  const mediaImage = (singleMedia, index) => {
    return (
      <div className="col-12 col-sm-6 col-md-4 col-xl-3 " key={index}>
        <img
          src={singleMedia.image.url}
          alt={singleMedia.image.alt}
          className="img-fluid shadow"
        />
        <h3 className="mt-2 mb-2">{singleMedia.title}</h3>
        <p>{singleMedia.description}</p>
      </div>
    );
  };

  const mediaYoutube = (singleMedia, index) => {
    return (
      <div className="col-12 col-md-6 col-xl-4" key={index}>
        <div dangerouslySetInnerHTML={{ __html: singleMedia.youtube.html }} />
        <h3>{singleMedia.title}</h3>
        <p>{singleMedia.description}</p>
      </div>
    );
  };

  if (!media || media.length === 0) return "";

  return (
    <section className="my-3 multiple-media-slice">
      <div className="container">
        {title && (
          <h2 className="text-center my-2 multiple-media-slice__title">
            {title}
          </h2>
        )}
        <div className="row justify-content-center">
          {media.map((singleMedia, index) => {
            if (singleMedia.media_type === "image")
              return mediaImage(singleMedia, index);
            if (singleMedia.media_type === "youtube")
              return mediaYoutube(singleMedia, index);
            return "";
          })}
        </div>
        {button_url && button_title && (
          <div className="text-center">
            <a href={button_url}>{button_title}</a>
          </div>
        )}
      </div>
    </section>
  );
};

MultipleMediaSlice.propTypes = {
  content: PropTypes.shape({
    type: PropTypes.string,
    title: PropTypes.string,
    button_title: PropTypes.string,
    button_url: PropTypes.string,
    media: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string,
        description: PropTypes.string,
        image: PropTypes.shape({
          url: PropTypes.string,
          alt: PropTypes.string
        }),
        media_type: PropTypes.string,
        youtube: PropTypes.object
      })
    )
  })
};

export default MultipleMediaSlice;
