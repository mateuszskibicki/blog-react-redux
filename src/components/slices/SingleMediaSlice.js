import React from "react";
import PropTypes from "prop-types";

const SingleMediaSlice = ({ content }) => {
  if (!content) return null;

  const {
    title,
    description,
    button_title,
    button_url,
    image,
    media_position,
    text_align,
    media_type,
    youtube
  } = content;

  return (
    <section className="my-3 single-media-slice">
      <div className="container-fluid" style={{ maxWidth: "1400px" }}>
        <div className="row justify-content-center align-items-center">
          <div
            className={`col-12 col-md-6 mt-2 mb-2 ${media_position === "left" &&
              "order-12"} ${text_align && "text-" + text_align}`}
          >
            {title && <h3>{title}</h3>}
            {description && description.length > 0 && <p>{description}</p>}
            {button_url && button_title && (
              <a href={button_url}>{button_title}</a>
            )}
          </div>
          <div
            className={`col-12 col-md-6 mt-2 mb-2 ${media_position === "left" &&
              "order-1"}`}
          >
            {media_type === "image" && (
              <img
                src={image.url}
                alt={image.alt}
                className="img-fluid shadow"
              />
            )}
            {media_type === "youtube" && (
              <div
                className="youtube"
                dangerouslySetInnerHTML={{ __html: youtube.html }}
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

SingleMediaSlice.propTypes = {
  content: PropTypes.shape({
    title: PropTypes.string,
    type: PropTypes.string,
    description: PropTypes.string,
    button_title: PropTypes.string,
    button_url: PropTypes.string,
    image: PropTypes.shape({
      url: PropTypes.string,
      alt: PropTypes.string
    }),
    media_position: PropTypes.string,
    text_align: PropTypes.string,
    media_type: PropTypes.string,
    youtube: PropTypes.object
  })
};

export default SingleMediaSlice;
